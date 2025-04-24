import { Hono } from "hono";
import { cors } from "hono/cors"
import { proxy } from "hono/proxy"
import { serve } from '@hono/node-server'
import { auth } from "@/lib/auth"; // path to your auth file
// import { web_serve } from "./web_serve.ts";
import { add_media, get_media, del_media, add_watchlist, get_watchlist } from "./api";
import { addMediaSchema, addWatchlistSchema } from "@/lib/validate";
import { spawn } from "child_process";
import path from "path";

// Path to your Python script
const scriptPath = path.resolve(__dirname, "recommendation_engine.py");

spawn(
    "python",
    [scriptPath],
).unref();

type Variables = {
    session: typeof auth.$Infer.Session.session | null,
    user: typeof auth.$Infer.Session.user | null
}

const app = new Hono<{ Variables: Variables }>()

console.log(auth.options)

// CORS
app.use(
    "/api/auth/**",
    cors({
        origin: (origin, _) => { // TODO: DO NOT LEAVE IN FINAL APP THIS IS VERY BAD
            return origin;
        },

        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
    }),
);

app.use("/api/**", async (c, next) => {
    console.log("auth middleware running!");
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

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw)); // Forward all auth requests to better-auth

app.post("/api/watchlist", async (c) => {
    let user = c.get("user");
    if (user == null) {
        return c.status(401);
    }

    const data = await c.req.json();
    let parse = addWatchlistSchema.safeParse(data);

    if (!parse.success) {
        return c.json({ error: parse.error.message }, 400);
    }

    const { title, isPublic } = parse.data;

    add_watchlist(user, title, isPublic)
})

app.get("/api/watchlist/:uuid", async (c) => {
    let user = c.get("user");
    if (user == null) {
        return c.status(401);
    }

    let results = await get_watchlist(user, c.req.param("uuid"))
    if (!results.public && results.user != user.id) {
        return c.status(401)
    } return
})

app.post("/api/recommendations", async (c) => {
    return proxy('http://localhost:5000',
        {
            method: "POST",
            headers: c.req.header(),
            body: JSON.stringify(await c.req.json())
        }
    );
})

app.post("/api/media", async (c) => {
    let user = c.get("user");
    if (user == null || user.role != "admin") {
        return c.status(403);
    }

    const data = await c.req.json();

    let parse = addMediaSchema.safeParse(data);

    if (!parse.success) {
        return c.json({ error: parse.error.message }, 400);
    }

    const { title, age_rating, genre, lang, is_movie } = parse.data

    await add_media(title, age_rating, genre, lang, is_movie);

    return c.json({ message: "Media added successfully" }, 201);

});
app.get("/api/media/:uuid", (c) => c.json(get_media(c.req.param('uuid'))));
app.delete("/api/media/:uuid", (c) => c.json(del_media(c.req.param('uuid'))))

serve(app);