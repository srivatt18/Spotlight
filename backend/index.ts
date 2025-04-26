import { Hono } from "hono";
import { cors } from "hono/cors"
import { proxy } from "hono/proxy"
import { serve } from '@hono/node-server'
import { auth } from "@/lib/auth";
import { spawn } from "child_process";
import path from "path";

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
    "*",
    cors({
        origin: (origin, _) => { // We can use many development servers
            return origin;
        },

        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["POST", "GET", "OPTIONS"],
        exposeHeaders: ["Content-Length"],
        maxAge: 600,
        credentials: true,
    }),
);

app.use("/api/*", async (c, next) => {
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

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw)); // Forward all auth requests to better-auth

app.post("/api/recommendations", async (c) => {
    return proxy('http://localhost:5000',
        {
            method: "POST",
            headers: c.req.header(),
            body: JSON.stringify(await c.req.json())
        }
    );
})

serve(app);