import { atom } from "jotai";
import type Stripe from "stripe";
import type { CartItem } from "./types";

export const cartAtom = atom<CartItem[]>([]);
export const newItemInCartAtom = atom<CartItem | null>(null);

export const searchQueryAtom = atom<string>('');

export const shippingInfoIdAtom = atom('');

export const stripeCheckoutSessionIdAtom = atom('');
export const stripeCheckoutSessionAtom = atom<Stripe.Response<Stripe.Checkout.Session> | undefined>(undefined);