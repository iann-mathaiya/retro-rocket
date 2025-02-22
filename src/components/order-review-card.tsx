import { useAtom } from 'jotai';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import type { LocalOrder } from '../lib/types';
import { cartAtom, shippingInfoAtom, stripeGuestCustomerAtom } from '../lib/store';

export default function OrderReviewCard() {
    const [cart, setCart] = useAtom(cartAtom);
    const [shippingInfo, setShippingInfo] = useAtom(shippingInfoAtom);
    const [orderDetails, setOrderDetails] = useState<LocalOrder[] | undefined>(undefined);
    const [stripeGuestCustomer, setStripeGuestCustomer] = useAtom(stripeGuestCustomerAtom);

    useEffect(() => {
        const storedShippingId = localStorage.getItem('shipping-info-id') ?? '';
        const storedSessionId = localStorage.getItem('stripe-checkout-session-id') ?? '';

        async function initializeCheckoutData() {

            try {
                const sessionResponse = await actions.checkout.retrieveCheckoutSession({
                    sessionId: storedSessionId
                });

                if (!sessionResponse.data?.success) {
                    console.error('Failed to retrieve session:', sessionResponse.error);
                    return;
                }

                const session = sessionResponse.data.session;

                if (session && !session.customer && session.customer_details) {
                    setStripeGuestCustomer({
                        name: session.customer_details.name,
                        email: session.customer_details.email,
                        phone: session.customer_details.phone,
                        address: session.customer_details.address,
                    });
                }
            } catch (err) {
                console.error('Error fetching session data:', err);
            }

            if (!storedShippingId) return;

            try {
                const shippingResponse = await actions.checkout.getShippingInformation({
                    shippingInfoId: storedShippingId
                });

                if (!shippingResponse.data?.success) {
                    console.error('Failed to retrieve shipping info:', shippingResponse.error);
                    return;
                }

                setShippingInfo(shippingResponse.data.shippingInfo);
            } catch (err) {
                console.error('Error fetching shipping data:', err);
            }
        }

        initializeCheckoutData();
    }, [setShippingInfo, setStripeGuestCustomer]);

    useEffect(() => {
        function handleOrderCompletion() {
            if (!cart || cart.length === 0) {
                console.log('Cart is empty');
                return;
            }

            const existingOrders = JSON.parse(localStorage.getItem('order-items') || '[]');

            const newOrder = {
                items: cart,
                orderedAt: new Date().toISOString(),
                orderId: `order-${Date.now()}`
            };

            const updatedOrders: LocalOrder[] = [...existingOrders, newOrder];

            localStorage.setItem('order-items', JSON.stringify(updatedOrders));
            setOrderDetails(JSON.parse(localStorage.getItem('order-items') || '[]'))

            setCart([]);

            localStorage.removeItem('cart');

            console.log('Order saved and cart cleared successfully');

            return { success: true, updatedOrders };
        };

        handleOrderCompletion();
    }, [cart, setCart]);

    return (
        <div className='mt-10 h-fit w-full'>
            <h1 className="mt-8 text-3xl text-gray-900 font-semibold">
                Order Details
            </h1>

            <p className="mt-2 text-sm text-gray-600">
                Thanks for shopping with us {shippingInfo?.firstName} 👋 <br />
                Your order is on it's way!
            </p>

            <div className='mt-6 sm:mt-8 space-y-2.5'>
                <h2 className='text-sm text-gray-900 font-semibold'>Customer Info</h2>

                <div className='flex items-center gap-3'>
                    <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" className='size-12'>
                        <title>Customer Profile Placeholder</title>
                        <mask id=":r79:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                            <rect width="36" height="36" rx="72" fill="#FFFFFF" />
                        </mask>
                        <g mask="url(#:r79:)">
                            <rect width="36" height="36" fill="#ff005b" />
                            <rect x="0" y="0" width="36" height="36" transform="translate(0 0) rotate(324 18 18) scale(1)" fill="#ffb238" rx="36" />
                            <g transform="translate(-4 -4) rotate(-4 18 18)">
                                <path d="M15 19c2 1 4 1 6 0" stroke="#000000" fill="none" strokeLinecap="round" />
                                <rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000" />
                                <rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000" />
                            </g>
                        </g>
                    </svg>

                    <div>
                        <h3 className='text-sm font-medium text-gray-900'>{stripeGuestCustomer?.name}</h3>
                        <p className='text-sm lowercase text-gray-600'>{stripeGuestCustomer?.email}</p>
                    </div>
                </div>

            </div>

            <div className='mt-6 sm:mt-8 space-y-2.5'>
                <h2 className='text-sm text-gray-900 font-semibold'>Shipping Info</h2>

                <div>
                    <p className='text-sm text-gray-600'>{shippingInfo?.phone}</p>
                    <p className='text-sm capitalize text-gray-600'>{shippingInfo?.address}</p>
                    <p className='text-sm capitalize text-gray-600'>{shippingInfo?.city}, {shippingInfo?.country}</p>
                </div>

            </div>

            <div className='mt-6 sm:mt-8 space-y-2.5'>
                <h2 className='text-sm text-gray-900 font-semibold'>In your bag</h2>

                <pre>{JSON.stringify(orderDetails, null, 2)}</pre>
            </div>

        </div>
    );
}
