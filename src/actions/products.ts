import Stripe from "stripe";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import type { StripeProduct } from "../utils/types";

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
                const response = await stripe.products.list({ active: true });

                if (!response?.data || !Array.isArray(response.data)) {
                    throw new Error('Invalid response format from Stripe');
                  }

                const transformedProducts: StripeProduct[] = response.data.map((product) => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    default_price: typeof product.default_price === 'object' ? 
                      product.default_price?.id : 
                      product.default_price,
                    images: product.images,
                    active: product.active
                  }));

                return { success: true, products: transformedProducts };
            } catch (error) {
                console.error(error);
                return { success: false, message: "An unexpected error occurred. Please try again." };
            }
        }
    })
};