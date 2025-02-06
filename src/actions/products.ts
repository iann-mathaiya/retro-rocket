import { defineAction } from "astro:actions";
import Stripe from "stripe";

export const products = {
    getProducts: defineAction({
        handler: async(context) => {
            const { env } = context.locals.runtime;

            const stripe = new Stripe(env.STRIPE_SECRET_KEY)

            try {
                const products = await stripe.products.list();

                  return { success: true, products };
            } catch (error) {
                console.error(error);
                return { success: false, message: "An unexpected error occurred. Please try again." };
            }
        }
    })
}