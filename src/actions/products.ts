import Stripe from "stripe";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import type { StripeProduct } from "../lib/types";

export const products = {
    addNewProduct: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string()
        }),
        handler: async () => {

        }
    }),
    getProducts: defineAction({
        handler: async () => {

            const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
                apiVersion: '2025-01-27.acacia',
                httpClient: Stripe.createFetchHttpClient()
            });

            try {
                const response = await stripe.products.list({
                    active: true,
                    expand: ['data.default_price'],
                });

                if (!response?.data || !Array.isArray(response.data)) {
                    throw new Error('Invalid response format from Stripe');
                }

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
                console.error(error);
                return { success: false, message: "An unexpected error occurred. Please try again." };
            }
        }
    }),
    getProduct: defineAction({
        input: z.object({
            productId: z.string()
        }),
        handler: async ({ productId }) => {

            const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
                apiVersion: '2025-01-27.acacia',
                httpClient: Stripe.createFetchHttpClient()
            });

            try {
                const product = await stripe.products.retrieve(productId, {
                    expand: ['default_price'],
                });

                const formattedProduct = {
                    ...product,
                    default_price: typeof product.default_price === 'object' ?
                        {
                            id: product.default_price?.id,
                            currency: product.default_price?.currency,
                            unit_price: ((product.default_price?.unit_amount ?? 0) / 100).toFixed(2),
                        }
                        :
                        product.default_price
                };

                return { success: true, product: { ...formattedProduct } };
            } catch (error) {
                if (error instanceof Stripe.errors.StripeError) {
                    if (error.type === 'StripeInvalidRequestError') {
                        return { success: false, message: "Product not found" };
                    }
                }

                console.error('Error fetching product:', error);
                return { success: false, message: "Failed to fetch product details" };
            }
        }
    })
};