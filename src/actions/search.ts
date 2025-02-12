import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import Stripe from "stripe";

export const search = {
    searchProducts: defineAction({
        input: z.object({
            query: z.string()
        }),
        handler: async ({ query }) => {

            const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
                apiVersion: '2025-01-27.acacia',
                httpClient: Stripe.createFetchHttpClient()
            });

            try {
                const products = await stripe.products.search({
                    query: `active:'true' AND name~'${query}'`,
                    expand: ['data.default_price'],
                });

                return { success: true, products: products.data };

            } catch (error) {
                if (error instanceof Stripe.errors.StripeError) {
                    if (error.type === 'StripeInvalidRequestError') {
                        return { success: false, message: "Product not found" };
                    }
                }

                console.error('Error searching product:', error);
                return { success: false, message: "Failed to retrieve relevant product" };
            }
        }
    })
};