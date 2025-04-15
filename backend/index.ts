import { Hono } from "hono";
import { cors } from "hono/cors"
import { serve } from '@hono/node-server'
import { auth } from "lib/auth"; // path to your auth file
// import { web_serve } from "./web_serve.ts";
import { add_media, get_media, del_media } from "./api";
import { addMediaSchema } from "@/lib/validate";

const app = new Hono();

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

app.use("*", async (c, next) => {
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

app.post("/api/media", async (c) => {
    
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