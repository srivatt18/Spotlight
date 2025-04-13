import { Hono } from "hono";
import { cors } from "hono/cors"
import { serve } from '@hono/node-server'
import { auth } from "../lib/auth"; // path to your auth file
import { web_serve } from "./web_serve";
import { add_media, get_media, del_media } from "./api";
 
const app = new Hono();
 
console.log(auth.options)

app.all("/api/auth/**", (c) => {console.log("got a request for auth"); let resp = auth.handler(c.req.raw); resp.then((a)=> console.log(a)); return resp});

app.get("/api/media/:uuid", (c) => c.json(get_media(c.req.param('uuid'))));
app.delete("/api/media/:uuid", (c) => c.json(del_media(c.req.param('uuid'))))

serve(app);