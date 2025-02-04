import type { APIRoute } from "astro";
import { app } from "../../../firebase/client";
import { getAuth } from "firebase-admin/auth";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    const auth = getAuth(app);

    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];

    if (!idToken) {
        return new Response("No token found", { status: 401 });
    }

    try {
        await auth.verifyIdToken(idToken);

        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn: 60 * 60 * 24 * 60 * 1000 //expires in 60 days
        });

        /* Set session cookie */
        cookies.set("__session", sessionCookie, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: !!import.meta.env.PROD,
        });

        return redirect("/store");

    } catch (error) {
        console.error("Token Verification Failed:", error);
        return new Response("Invalid token", { status: 401 });
    }
};