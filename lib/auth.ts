import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
 
export const auth = betterAuth({
    baseURL: "http://127.0.0.1:3000",
    database: new Database("./sqlite.db"),
    emailAndPassword: {  
        enabled: true
    },
})