import { eq } from "drizzle-orm"
import type { APIContext } from "astro"
import { Argon2id } from "oslo/password"

import { db } from "db/drizzle"
import { lucia } from "lib/auth"
import { users } from "db/schema"

export async function POST(context: APIContext): Promise<Response> {
  const body = await context.request.json()

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email_address, body.emailAddress),
  })

  if (!existingUser) {
    return new Response(
      JSON.stringify({
        message: "User does not exit",
        status: 401,
      })
    )
  }

  const validPassword = await new Argon2id().verify(
    existingUser.hashed_password,
    body.password
  )
  if (!validPassword) {
    return new Response(
      JSON.stringify({
        message: "Incorrect password",
        status: 400,
      })
    )
  }

  const session = await lucia.createSession(existingUser.id, {})

  const sessionCookie = lucia.createSessionCookie(session.id)
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return context.redirect("/")
}
