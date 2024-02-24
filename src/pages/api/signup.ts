import { db } from "db/drizzle"
import { users } from "db/schema"
import { lucia } from "lib/auth"
import { generateId } from "lucia"
import { Argon2id } from "oslo/password"

import type { APIContext } from "astro"

export async function POST(context: APIContext): Promise<Response> {
  const body = await context.request.json()

  const userId = generateId(15)
  const hashedPassword = await new Argon2id().hash(body.password)

  await db.insert(users).values({
    id: userId,
    username: body.username,
    hashed_password: hashedPassword,
    email_address: body.emailAddress.toLowerCase(),
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return context.redirect("/")
}
