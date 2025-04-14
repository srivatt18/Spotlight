import { Hono } from "hono";
import { cors } from "hono/cors"
import { serve } from '@hono/node-server'
import { auth } from "lib/auth"; // path to your auth file
// import { web_serve } from "./web_serve.ts";
import { add_media, get_media, del_media } from "./api";

const app = new Hono();

console.log(auth.options)


app.use(
	"/api/auth/**", // or replace with "*" to enable cors for all routes
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

app.on(["POST", "GET"], "/api/auth/**", (c) => {
    console.log("got a request for auth:");
    console.log(c.req.raw.url)

    let resp = auth.handler(c.req.raw);

    resp.then((a) => {
        console.log("The response from authhandler is:");
        console.log(a);
    });

    return resp
});

app.get("/api/media/:uuid", (c) => c.json(get_media(c.req.param('uuid'))));
app.delete("/api/media/:uuid", (c) => c.json(del_media(c.req.param('uuid'))))

serve(app);