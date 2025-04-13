import { createAuthClient } from "better-auth/react"
export const { signIn, signUp, useSession } = createAuthClient(
    {
        /** the base url of the server (optional if you're using the same domain) */
        baseURL: "http://127.0.0.1:3000"
    }
)