import { sql } from "drizzle-orm"
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  role: text('role').default('user').notNull(),
  username: text("username").unique().notNull(),
  hashed_password: text("hashed_password").notNull(),
  email_address: text("email_address").unique().notNull(),
})

export type User = typeof users.$inferSelect

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
})

export type Session = typeof sessions.$inferSelect

export const cart = sqliteTable("cart", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export type Cart = typeof cart.$inferSelect