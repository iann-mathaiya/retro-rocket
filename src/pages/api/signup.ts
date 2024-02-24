import { db } from "db/drizzle"
import { users } from "db/schema"
import { lucia } from "lib/auth"
import { generateId } from "lucia"
import { Argon2id } from "oslo/password"

import type { APIContext } from "astro"

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()

  const username = String(formData.get("username"))
  const emailAddress = String(formData.get("email_address"))
  const password = String(formData.get("password"))

  const userId = generateId(15)
  const hashedPassword = await new Argon2id().hash(password)

  await db.insert(users).values({
    id: userId,
    username: username,
    hashed_password: hashedPassword,
    email_address: emailAddress.toLowerCase(),
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
