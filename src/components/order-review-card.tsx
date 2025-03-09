import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { actions } from 'astro:actions';
import { cartAtom, stripeCheckoutSessionAtom } from '../lib/store';
import { format } from 'date-fns';

export default function OrderReviewCard() {
    const [cart, setCart] = useAtom(cartAtom);
    const [stripeCheckoutSession, setStripeCheckoutSession] = useAtom(stripeCheckoutSessionAtom);

    useEffect(() => {
        const storedSessionId = localStorage.getItem('stripe-checkout-session-id') ?? '';

        async function initializeCheckoutData() {
            try {
                const { data, error } = await actions.checkout.retrieveCheckoutSession({
                    sessionId: storedSessionId
                });

                if (!data?.success) {
                    console.error('Failed to retrieve session:', error);
                    return;
                }

                setStripeCheckoutSession(data.session);


            } catch (err) {
                console.error('Error fetching session data:', err);
            }
        }

        initializeCheckoutData();
    }, [setStripeCheckoutSession]);

    useEffect(() => {
        function handleOrderCompletion() {
            if (!cart || cart.length === 0) {
                console.log('Cart is empty');
                return;
            }

            setCart([]);

            localStorage.removeItem('cart');
        };

        handleOrderCompletion();
    }, [cart, setCart]);

    const session = stripeCheckoutSession;

    return (
        <>
            <div className='py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4'>
                <div>
                    <h1 className="text-3xl text-gray-900 font-semibold">
                        Order Details
                    </h1>

                    <p className="mt-2 text-sm text-gray-600">
                        Thanks for shopping with us {session?.customer.name} 👋 <br />
                        Your order is on it's way!
                    </p>
                </div>

                <a href='/signin' className="w-fit py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer rounded-full transition-all duration-500 ease-in-out">
                    Sign in track your order
                </a>

            </div>

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
                                <h3 className='text-sm font-medium text-gray-900'>{session?.customer?.name}</h3>
                                <p className='text-sm lowercase text-gray-600'>{session?.customer?.email}</p>
                            </div>
                        </div>

                    </div>

                    <div className='space-y-2.5'>
                        <h2 className='text-sm text-gray-900 font-semibold'>Shipping Info</h2>

                        <div>
                            <p className='text-sm text-gray-600'>{session?.customer?.phone}</p>
                            <p className='text-sm capitalize text-gray-600'>{session?.customer?.address?.line1}</p>
                            <p className='text-sm capitalize text-gray-600'>{session?.customer?.address?.city}, {session?.customer?.address?.postal_code}</p>
                            <p className='text-sm capitalize text-gray-600'>
                                {session?.customer?.address?.state && `${session?.customer?.address?.state},`} {session?.customer?.address?.country}
                            </p>
                        </div>

                    </div>
                </div>


                <div className='space-y-1 sm:order-first sm:col-span-2'>
                    <h2 className='text-sm text-gray-900 font-semibold'>In your bag</h2>
                    <p className='text-xs text-gray-600'>Ordered at {session?.orderedAt && format(session?.orderedAt, "PPP")}</p>
                    <ul className='space-y-6 sm:space-y-8'>
                        {session?.orderItems?.map(item =>
                            <li key={item.id} className='flex items-center'>
                                <img src={item.images[0]} alt={item.name} className='w-20 aspect-square object-center object-cover' />

                                <div>
                                    <h4 className='text-sm text-gray-700'>{item.name}</h4>
                                    <p className='text-xs text-gray-500'>{item.quantity} x ${item.amount_total}</p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>


        </>
    );
}
