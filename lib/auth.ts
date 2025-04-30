import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins"
import Database from "better-sqlite3";
 
export const auth = betterAuth({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
    trustedOrigins: ["http://localhost:8081"],
    database: new Database("./sqlite.db"),
    emailAndPassword: {  
        enabled: true
    },
    
    user: {
        additionalFields: {
            watchList: {
                type: "string", // JSON.stringify()'d watchlist
                required: true,
                defaultValue: "[]",
            },

            watchedMovies: {
                type: "string",
                required: true,
                defaultValue: "[]"
            },
            
            lang: {
                type: "string",
                required: true,
                defaultValue: "en-US"
            }
        }
    },

    plugins: [ admin()]
})