import { Lucia } from "lucia"
import { adapter } from "../db/drizzle"

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      role: attributes.role,
      username: attributes.username,
      emailAddress: attributes.email_address,
      hashedPassword: attributes.hashed_password,
    }
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

export interface DatabaseUserAttributes {
  role: string
  username: string
  email_address: string
  hashed_password: string
}
