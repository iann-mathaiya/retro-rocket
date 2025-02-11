import { z } from "astro:schema";
import { defineAction } from "astro:actions";

export const checkout = {
    createCheckoutSession: defineAction({
        input: z.object({
            lineItems: z.array(z.object({
                priceId: z.string(),
                quantity: z.number().int().positive()
            })),
            successUrl: z.string(),
            cancelUrl: z.string()
        }),
        handler: async ({ lineItems, successUrl, cancelUrl }) => {
            // Create a new checkout session
        }
    })
}