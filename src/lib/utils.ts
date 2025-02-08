import { $cartItems } from "./store";
import type { CartItem } from "./types";

export function syncCartWithLocalStorage({ ...cartItems }: Record<string, CartItem>) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};

export function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        
        for (const [id, item] of Object.entries(parsedCart)) {
            $cartItems.setKey(id, item as CartItem);
        }
    }
};