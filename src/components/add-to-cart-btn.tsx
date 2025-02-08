import { $cart, $cartItems } from '../lib/store';
import { useStore } from '@nanostores/react';
import type { StripeProduct } from '../lib/types';


export default function AddToCartButton({ product, }: { product: StripeProduct }) {
  
  return (
    <button type='button'
      className="mt-2 w-fit py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer hover:scale-110 rounded-full transition-all duration-500 ease-in-out">
      Add to cart
    </button>
  );
}