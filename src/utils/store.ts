import { map } from "nanostores";
import type { CartItem } from "./types";

export const cartItems = map<Record<string, CartItem>>({});

export function addCartItem({ id, name, imageSrc }: CartItem) {
    const existingEntry = cartItems.get()[id];
    
    if (existingEntry) {
        cartItems.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity + 1,
        });
    } else {
        cartItems.setKey(
            id,
            { id, name, imageSrc, quantity: 1 }
        );
    }
}