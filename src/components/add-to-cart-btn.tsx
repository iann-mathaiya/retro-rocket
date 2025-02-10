import { useAtom } from 'jotai';
import { navigate } from 'astro:transitions/client';
import { cartAtom, newItemInCartAtom } from '../lib/store';
import type { CartItem, StripeProduct } from '../lib/types';
import { useEffect, useState } from 'react';

export default function AddToCartButton({ product }: { product: StripeProduct; }) {
  const [cart, setCart] = useAtom(cartAtom);

  function addToCart() {
    const { id, name, images, default_price } = product;

    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = (existingItem.price as number) * existingItem.quantity;
    } else {

      const newItem: CartItem = {
        id: id,
        name: name,
        quantity: 1,
        imageSrc: images[0],
        price: typeof default_price === 'object' ? Number.parseInt(String(default_price?.unit_price ?? '0')) : (default_price ?? 0),
        totalPrice: typeof default_price === 'object' ? Number.parseInt(String(default_price?.unit_price ?? '0')) : (default_price ?? 0),
      }

      updatedCart.push(newItem);
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate(`/shop/review-cart/${product.id}`);

  }

  return (
    <button
      type='button'
      onClick={addToCart}
      className="mt-2 w-fit py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer hover:scale-110 rounded-full transition-all duration-500 ease-in-out">
      Add to cart
    </button>
  );
}