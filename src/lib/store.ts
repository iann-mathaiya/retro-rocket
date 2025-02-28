import { atom } from "jotai";
import type Stripe from "stripe";
import type { CartItem, GuestCustomer } from "./types";

export const cartAtom = atom<CartItem[]>([]);
export const newItemInCartAtom = atom<CartItem | null>(null);

export const searchQueryAtom = atom<string>('');

export const stripeCheckoutSessionAtom = atom<Stripe.Response<Stripe.Checkout.Session> | undefined>(undefined);
export const stripeGuestCustomerAtom = atom<GuestCustomer | undefined>(undefined);