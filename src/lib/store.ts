import { atom, map } from "nanostores";
import type { CartItem } from "./types";

export const $cart = atom<CartItem[]>([]);
export const $cartItems = map<Record<string, CartItem>>({});

export function addCartItem({ id, name, price, imageSrc }: CartItem) {
    const existingEntry = $cartItems.get()[id];
    
    if (existingEntry) {
        $cartItems.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity + 1,
        });
    } else {
        $cartItems.setKey(
            id,
            { id, name, imageSrc, price, quantity: 1 }
        );
    }
}