import * as schema from "./schema"
import { sessions, users } from "./schema"
import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"

const client = createClient({
  url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
})

export const db = drizzle(client, { schema })

export const adapter = new DrizzleSQLiteAdapter(db, sessions, users)