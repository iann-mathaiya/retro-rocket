import Stripe from "stripe";

export const INITIAL_QUANTITY = 1;

//stripe api config
export const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia',
    httpClient: Stripe.createFetchHttpClient()
});