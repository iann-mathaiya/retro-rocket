import { useAtomValue } from 'jotai';
import { cartAtom } from '../lib/store';
import { useEffect, useState } from 'react';
import { actions } from 'astro:actions';

export default function OrderSummaryCard() {
    const cart = useAtomValue(cartAtom);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const subTotal = cart.reduce((acc, item) => acc + (item.price as number) * item.quantity, 0);
        setSubTotal(subTotal);
    }, [cart]);

    const lineItems = cart.map((item) => ({
        price: item.priceId,
        quantity: item.quantity
    }));

    async function handleCheckout() {
        setIsLoading(true);

        const { data, error } = await actions.checkout.createCheckoutSession({
            lineItems,
            successUrl: `${window.location.origin}/shop/review-order`,
            cancelUrl: `${window.location.origin}/shop/cart`,
        });

        localStorage.setItem("stripe-checkout-session-id", data?.session?.id as string);

        window.location.href = data?.session?.url as string;
        setIsLoading(false);
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
                <p className='text-base text-gray-700 font-medium'>${discount}.00</p>
            </div>

            <div className='mt-2 flex justify-between items-center border-t border-gray-400/35 pt-2'>
                <h3 className='text-xl text-gray-900 font-medium'>Total</h3>
                <p className='text-xl text-gray-900 font-medium'>
                    ${subTotal - discount}.00
                </p>
            </div>

            <button type="button" onClick={handleCheckout} disabled={isLoading} className='mt-4 w-full py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 disabled:hover:bg-gray-900 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed rounded-full transition-all duration-500 ease-in-out'>
                {isLoading ? 'Processing...' : 'Checkout'}
            </button>

        </div>
    );
}
