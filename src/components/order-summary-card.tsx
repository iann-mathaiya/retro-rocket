import { useAtomValue } from 'jotai';
import { cartAtom } from '../lib/store';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import { navigate } from 'astro:transitions/client';

export default function OrderSummaryCard() {
    const cart = useAtomValue(cartAtom);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        const subTotal = cart.reduce((acc, item) => acc + (item.price as number) * item.quantity, 0);
        setSubTotal(subTotal);
    }, [cart]);

    const lineItems = cart.map((item) => ({
        price: item.priceId,
        quantity: item.quantity
    }));

    async function handleCheckout() {
        const { data, error } = await actions.checkout.createCheckoutSession({
            lineItems,
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/shop/cart`,
        });

        window.location.href = data?.session?.url as string

        console.log({data, error});
    }

    return (
        <div className='mt-10 h-fit w-full'>
            <h2 className='mt-4 sm:mt-0 text-sm text-gray-600 font-medium'>Order Summary</h2>

            <div className='mt-2 flex justify-between items-center'>
                <h3 className='text-base text-gray-700 font-medium'>Sub-total</h3>
                <p className='text-base text-gray-700 font-medium'>${subTotal}.00</p>
            </div>

            <div className='mt-2 flex justify-between items-center'>
                <h3 className='text-base text-gray-700 font-medium'>Discount</h3>
                <p className='text-base text-gray-700 font-medium'>$0.00</p>
            </div>

            <div className='mt-2 flex justify-between items-center border-t border-gray-400/35 pt-2'>
                <h3 className='text-xl text-gray-900 font-medium'>Total</h3>
                <p className='text-xl text-gray-900 font-medium'>
                    ${subTotal - discount}.00
                </p>
            </div>

            <button type="button" onClick={handleCheckout} className='mt-4 w-full py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer rounded-full transition-all duration-500 ease-in-out'>
                Proceed to checkout
            </button>
        </div>
    );
}
