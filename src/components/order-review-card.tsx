import { useAtom } from 'jotai';
import { actions } from 'astro:actions';
import { useEffect, useState } from 'react';
import type { LocalOrder } from '../lib/types';
import { cartAtom, shippingInfoAtom, stripeGuestCustomerAtom } from '../lib/store';

export default function OrderReviewCard() {
    const [cart, setCart] = useAtom(cartAtom);
    const [orderDetails, setOrderDetails] = useState<LocalOrder[] | undefined>(undefined);
    const [stripeGuestCustomer, setStripeGuestCustomer] = useAtom(stripeGuestCustomerAtom);

    useEffect(() => {
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
        }

        initializeCheckoutData();
    }, [setStripeGuestCustomer]);

    useEffect(() => {
        const existingOrders: LocalOrder[] = JSON.parse(localStorage.getItem('order-items') || '[]');

        if (existingOrders.length > 0) {
            setOrderDetails(existingOrders);
        }

        function handleOrderCompletion() {
            if (!cart || cart.length === 0) {
                console.log('Cart is empty');
                return;
            }

            const newOrder = {
                items: cart,
                orderedAt: new Date().toISOString(),
                orderId: `ORD${Date.now()}`
            };

            const updatedOrders: LocalOrder[] = [...existingOrders, newOrder];

            localStorage.setItem('order-items', JSON.stringify(updatedOrders));

            setOrderDetails(JSON.parse(localStorage.getItem('order-items') || '[]'));

            setCart([]);

            localStorage.removeItem('cart');
        };

        handleOrderCompletion();
    }, [cart, setCart]);

    return (
        <>
            <div className='py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4'>
                <div>
                    <h1 className="text-3xl text-gray-900 font-semibold">
                        Order Details
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Thanks for shopping with us {stripeGuestCustomer?.name} 👋 <br />
                        Your order is on it's way!
                    </p>
                </div>

                <a href='/signin' className="w-fit py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer rounded-full transition-all duration-500 ease-in-out">
                    Sign in track your order
                </a>

            </div>

            <pre>{JSON.stringify(stripeGuestCustomer, null, 2)}</pre>

            <div className='mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8'>
                <div className='space-y-6 sm:space-y-8'>
                    <div className='space-y-2.5'>
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

                    <div className='space-y-2.5'>
                        <h2 className='text-sm text-gray-900 font-semibold'>Shipping Info</h2>

                        <div>
                            <p className='text-sm text-gray-600'>{stripeGuestCustomer?.phone}</p>
                            <p className='text-sm capitalize text-gray-600'>{stripeGuestCustomer?.address?.line1}</p>
                            <p className='text-sm capitalize text-gray-600'>{stripeGuestCustomer?.address?.city}, {stripeGuestCustomer?.address?.postal_code}</p>
                            <p className='text-sm capitalize text-gray-600'>{stripeGuestCustomer?.address?.state}, {stripeGuestCustomer?.address?.country}</p>
                        </div>

                    </div>
                </div>


                <div className='space-y-2.5 sm:order-first sm:col-span-2'>
                    <h2 className='text-sm text-gray-900 font-semibold'>In your bag</h2>

                    {/* <pre>{JSON.stringify(orderDetails, null, 2)}</pre> */}

                    <ul className='space-y-6 sm:space-y-8'>
                        {orderDetails?.map(order =>
                            <li key={order.orderId}>
                                <h3 className='text-xs text-gray-900 font-semibold'>Order #{order.orderId} - ordered at {order.orderedAt}</h3>

                                {order.items.map(item =>
                                    <ol key={item.id} className='flex items-center'>
                                        <img src={item.imageSrc} alt={item.name} className='w-20 aspect-square object-center object-cover' />

                                        <div>
                                            <h4 className='text-sm text-gray-700'>{item.name}</h4>
                                            <p className='text-xs text-gray-500'>{item.quantity} x ${item.price}</p>
                                        </div>
                                    </ol>

                                )}
                            </li>
                        )}
                    </ul>
                </div>
            </div>


        </>
    );
}
