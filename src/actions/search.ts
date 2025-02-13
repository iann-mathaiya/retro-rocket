import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import Stripe from "stripe";
import type { StripeProduct } from "../lib/types";

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
                const response = await stripe.products.search({
                    query: `active:'true' AND name~'${query}'`,
                    expand: ['data.default_price'],
                });

                const transformedProducts: StripeProduct[] = response.data.map((product) => ({
                    ...product,
                    default_price: typeof product.default_price === 'object' ?
                        {
                            id: product.default_price?.id,
                            currency: product.default_price?.currency,
                            unit_price: ((product.default_price?.unit_amount ?? 0) / 100).toFixed(2),
                        }
                        :
                        product.default_price,
                }));

                return { success: true, products: transformedProducts };

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