import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    const auth = getAuth(app);

    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

    console.log('idToken in api:', idToken)

    if (!idToken) {
        return new Response("No token found", { status: 401 });
    }

    try {
        await auth.verifyIdToken(idToken);

        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn: 60 * 60 * 24 * 10 * 1000 //expires in 10 days
        });

        /* Set session cookie */
        cookies.set("__session", sessionCookie, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return redirect("/dashboard");

    } catch (error) {
        console.error("Token Verification Failed:", error);
        return new Response("Invalid token", { status: 401 });
    }
};