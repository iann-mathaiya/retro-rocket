import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const cart = {
    addToCart: defineAction({
        accept: 'form',
        input: z.object({
            productId: z.string(),
            quantity: z.number().int().positive()
        }),
        handler: async ({ productId, quantity }) => {
            // Add product to cart
        }
    })
}