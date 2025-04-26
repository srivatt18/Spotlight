import { Hono } from "hono";
import { cors } from "hono/cors";
import { proxy } from "hono/proxy";
import { serve } from "@hono/node-server";
import { auth } from "@/lib/auth";
import { add_media, get_media, del_media } from "./api";
import { addMediaSchema } from "@/lib/validate";
import { spawn } from "child_process";
import path from "path";

// Start the recommendation engine Python script
const scriptPath = path.resolve(__dirname, "recommendation_engine.py");
spawn("python", [scriptPath]).unref();

// Session and user typing
type Variables = {
  session: typeof auth.$Infer.Session.session | null;
  user: typeof auth.$Infer.Session.user | null;
};

const app = new Hono<{ Variables: Variables }>();

console.log(auth.options);

// CORS for development
app.use(
  "/api/auth/**",
  cors({
    origin: (origin, _) => origin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Middleware: attach user/session to context
app.use("/api/**", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

// Auth route passthrough
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

/* --------------------------
   WATCHLIST ROUTES
-------------------------- */

// ✅ Add media to user watchlist
app.post("/api/user/watchlist", async (c) => {
  const user = c.get("user");
  if (!user) return c.status(401);

  const { mediaId } = await c.req.json();
  if (!mediaId) return c.json({ error: "Missing mediaId" }, 400);

  const updatedWatchList = user.watchList?.includes(mediaId)
    ? user.watchList
    : [...(user.watchList || []), mediaId];

  await auth.api.updateUser({
    body: {
      watchList: updatedWatchList,
    },
  });

  return c.json({ message: "Watchlist updated", watchList: updatedWatchList });
});

// ✅ Get all media in the user's watchlist
app.get("/api/user/watchlist", async (c) => {
  const user = c.get("user");
  if (!user) return c.status(401);

  const mediaList = (user.watchList || []).map((uuid: string) => get_media(uuid));
  const resolved = await Promise.all(mediaList);

  return c.json(resolved);
});

// ✅ Mark media as watched
app.post("/api/user/watched", async (c) => {
  const user = c.get("user");
  if (!user) return c.status(401);

  const { mediaId } = await c.req.json();
  if (!mediaId) return c.json({ error: "Missing mediaId" }, 400);

  const updatedWatchHistory = user.watchHistory?.includes(mediaId)
    ? user.watchHistory
    : [...(user.watchHistory || []), mediaId];

  await auth.api.updateUser({
    body: {
      watchHistory: updatedWatchHistory,
    },
  });

  return c.json({ message: "Marked as watched", watchHistory: updatedWatchHistory });
});

/* --------------------------
   RECOMMENDATION ENGINE
-------------------------- */

// 🔁 Proxy request to Python recommendation server
app.post("/api/recommendations", async (c) => {
  return proxy("http://localhost:5000", {
    method: "POST",
    headers: c.req.header(),
    body: JSON.stringify(await c.req.json()),
  });
});

/* --------------------------
   MEDIA MANAGEMENT
-------------------------- */

// ➕ Add new media (admin only)
app.post("/api/media", async (c) => {
  const user = c.get("user");
  if (!user || user.role !== "admin") return c.status(403);

  const data = await c.req.json();
  const parse = addMediaSchema.safeParse(data);

  if (!parse.success) {
    return c.json({ error: parse.error.message }, 400);
  }

  const { title, age_rating, genre, lang, is_movie } = parse.data;
  await add_media(title, age_rating, genre, lang, is_movie);

  return c.json({ message: "Media added successfully" }, 201);
});

// 🔍 Get media by ID
app.get("/api/media/:uuid", (c) => c.json(get_media(c.req.param("uuid"))));

// ❌ Delete media by ID
app.delete("/api/media/:uuid", (c) => c.json(del_media(c.req.param("uuid"))));

/* --------------------------
   START SERVER
-------------------------- */

serve(app);
