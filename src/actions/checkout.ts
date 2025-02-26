import Stripe from "stripe";
import { z } from "astro:schema";
import { defineAction } from "astro:actions";

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
                    mode: 'payment',
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    success_url: successUrl,
                    cancel_url: cancelUrl,
                    phone_number_collection: { enabled: true },
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA', 'GB', 'JP', 'ZA', 'KE', 'EG', 'AU', 'IN', 'DE', 'BR', 'FR'],
                    },
                    shipping_options: [
                        {
                            shipping_rate_data: {
                                type: 'fixed_amount',
                                fixed_amount: { amount: 1000, currency: 'usd' },
                                display_name: 'Express Shipping',
                                delivery_estimate: {
                                    minimum: { unit: 'business_day', value: 1 },
                                    maximum: { unit: 'business_day', value: 2 },
                                },
                            },
                        },
                        {
                            shipping_rate_data: {
                                type: 'fixed_amount',
                                fixed_amount: { amount: 750, currency: 'usd' },
                                display_name: 'Standard Shipping',
                                delivery_estimate: {
                                    minimum: { unit: 'business_day', value: 3 },
                                    maximum: { unit: 'business_day', value: 4 },
                                },
                            },
                        },
                        {
                            shipping_rate_data: {
                                type: 'fixed_amount',
                                fixed_amount: { amount: 0, currency: 'usd' },
                                display_name: 'Free Shipping',
                                delivery_estimate: {
                                    minimum: { unit: 'business_day', value: 5 },
                                    maximum: { unit: 'business_day', value: 7 },
                                },
                            },
                        },
                    ],
                });

                return { success: true, session: { id: session.id, url: session.url } };

            } catch (error) {
                console.error('Error creating checkout session:', error);
                return { success: false, message: 'An unexpected error occurred. Please try again.' };
            }

        }
    }),
    retrieveCheckoutSession: defineAction({
        input: z.object({
            sessionId: z.string()
        }),
        handler: async ({ sessionId }) => {

            const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
                apiVersion: '2025-01-27.acacia',
                httpClient: Stripe.createFetchHttpClient()
            });

            try {
                const session = await stripe.checkout.sessions.retrieve(
                    sessionId,
                    {expand: ['line_items.data.price.product']}
                );

                console.log('retrieved session:', session)

                return { success: true, session };

            } catch (error) {
                console.error('Error retrieving checkout session:', error);
                return { success: false, message: 'An unexpected error occurred. Please try again.' };
            }

        }
    }),
};