import Stripe from "stripe";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

process.removeAllListeners('warning')

export const products = {
    getProducts: defineAction({
        handler: async(context) => {
            const { env } = context.locals.runtime;

            const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
                apiVersion: '2025-01-27.acacia',
                httpClient: Stripe.createFetchHttpClient()
            })

            try {
                const products = await stripe.products.list({active: true});

                console.log('fdgbdxfbxfbh', products)

                  return { success: true, products };
            } catch (error) {
                console.error(error);
                return { success: false, message: "An unexpected error occurred. Please try again." };
            }
        }
    })
}