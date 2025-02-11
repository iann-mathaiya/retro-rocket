import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import Stripe from "stripe";

export const checkout = {
    createCheckoutSession: defineAction({
        input: z.object({
            lineItems: z.array(z.object({
                price: z.string(),
                quantity: z.number().int().positive()
            })),
            successUrl: z.string(),
            cancelUrl: z.string()
        }),
        handler: async ({ lineItems, successUrl, cancelUrl }, context) => {

            const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
                apiVersion: '2025-01-27.acacia',
                httpClient: Stripe.createFetchHttpClient()
            });

            try {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: successUrl,
                    cancel_url: cancelUrl,
                });
                
                return { success: true, session: {id: session.id, url: session.url} };

            } catch (error) {
                console.error('Error creating checkout session:', error);
                return { success: false, message: 'An unexpected error occurred. Please try again.' };
            }

        }
    })
}