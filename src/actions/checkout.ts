import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import Stripe from "stripe";
import { db } from "../firebase/server";

export const checkout = {
    saveShippingInformation: defineAction({
        accept: 'form',
        input: z.object({
            firstName: z.string(),
            lastName: z.string(),
            country: z.string(),
            phone: z.string(),
            state: z.string(),
            city: z.string(),
            address: z.string(),
            email: z.string().email(),
            zip: z.string().optional(),
        }),
        handler: async (input, context) => {
            // Save the shipping information to the database

            const dataToStore = {
                ...input,
                createdAt: new Date()
              };

              console.log(dataToStore)

            const docRef = await db.collection('shipping-info').add(dataToStore);

            console.log(docRef.id)

            return { success: true, shippingInfoId: docRef.id };

        }
    }),
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
                const session = await stripe.checkout.sessions.retrieve(sessionId);

                return { success: true, session };

            } catch (error) {
                console.error('Error retrieving checkout session:', error);
                return { success: false, message: 'An unexpected error occurred. Please try again.' };
            }

        }
    })
};