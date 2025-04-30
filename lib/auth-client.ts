import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth";

console.log("URL: " + process.env.EXPO_PUBLIC_BACKEND_URL + "@")
console.log("URL: " + "http://localhost:3000" + "@")
export const { signIn, signUp, signOut, useSession, updateUser } = createAuthClient(
    {
        // I'm going crazy trying to figure out why process.env.EXPO_PUBLIC_BACKEND_URL fails when substituted!!!
        baseURL: "http://localhost:3000", 
        plugins: [inferAdditionalFields<typeof auth>()]
    }
)