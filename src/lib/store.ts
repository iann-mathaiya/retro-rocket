import { atom } from "jotai";
import type { CartItem } from "./types";

export const cartAtom = atom<CartItem[]>([]);
export const newItemInCartAtom = atom<CartItem | null>(null);

export const searchQueryAtom = atom<string>('');

export const shippingInfoIdAtom = atom('');