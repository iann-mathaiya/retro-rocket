import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import Stripe from "stripe";
import { db } from "../firebase/server";
import type { ShippingInfo } from "../lib/types";
import { Timestamp } from "firebase-admin/firestore";

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

            // console.log(dataToStore);

            const docRef = await db.collection('shipping-info').add(dataToStore);

            // console.log(docRef.id);

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
                    shipping_address_collection: {
                        allowed_countries: ['US', 'CA', 'GB'], // Add countries you want to support
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
                const session = await stripe.checkout.sessions.retrieve(sessionId);

                // console.log('session:', session);

                return { success: true, session };

            } catch (error) {
                console.error('Error retrieving checkout session:', error);
                return { success: false, message: 'An unexpected error occurred. Please try again.' };
            }

        }
    }),
    getShippingInformation: defineAction({
        input: z.object({
            shippingInfoId: z.string()
        }),
        handler: async ({ shippingInfoId }) => {
            try {

                const doc = await db.collection('shipping-info').doc(shippingInfoId).get();

                if (!doc.exists) {
                    return { success: false, message: 'Shipping information not found' };
                }

                const shippingInfoData = doc.data() as ShippingInfo;

                const shippingInfo = {
                    ...shippingInfoData,
                    createdAt: shippingInfoData.createdAt instanceof Timestamp
                        ? shippingInfoData.createdAt.toDate().toISOString()
                        : shippingInfoData.createdAt
                };

                console.log(shippingInfo);

                return { success: true, shippingInfo };

            } catch (error) {
                console.error('Error retrieving checkout session:', error);
                return { success: false, message: 'An unexpected error occurred. Please try again.' };
            }
        }
    })
};