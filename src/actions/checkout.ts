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
                });

                // console.log('session id:', session.id);

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