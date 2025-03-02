import { atom } from "jotai";
import type Stripe from "stripe";
import type { CartItem, StripeOrder } from "./types";

export const cartAtom = atom<CartItem[]>([]);
export const newItemInCartAtom = atom<CartItem | null>(null);

export const searchQueryAtom = atom<string>('');

export const stripeCheckoutSessionAtom = atom<StripeOrder | undefined>(undefined);