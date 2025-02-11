import { useAtom } from 'jotai';
import { cartAtom } from '../lib/store';
import { useEffect, useState } from 'react';
import QuantityCounter from './quantity-counter';
import ProceedToCheckoutCard from './proceed-to-checkout-card';

export default function CartList() {
    const [cart, setCart] = useAtom(cartAtom);

    function removeItem(itemId: string) {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8'>
            <ul className='sm:col-span-2 w-full'>
                {cart.map((item) => (
                    <li key={item.id} className='group flex items-center sm:items-start gap-4'>
                        <img src={item.imageSrc} alt={item.name} className='w-40 aspect-square object-cover object-center group-hover:scale-110 transition-all duration-300 ease-in-out' />

                        <div className='w-full'>
                            <div className='sm:mt-10 w-full flex flex-col sm:flex-row justify-between'>
                                <h1 className="text-xl text-gray-900 font-medium">{item.name}</h1>
                                <p className="text-xl text-gray-900 font-medium">
                                    ${item.totalPrice}.00
                                </p>
                            </div>

                            <div className='mt-3 flex items-center gap-4'>
                                <QuantityCounter itemId={item.id} itemQuantity={item.quantity} />

                                <button type="button" onClick={() => removeItem(item.id)} className="text-sm text-gray-600  hover:text-red-600 hover:cursor-pointer">
                                    Remove
                                </button>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>

            <ProceedToCheckoutCard />

        </div>
    );
}
