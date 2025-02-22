import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { actions } from 'astro:actions';
import { cartAtom, shippingInfoAtom, stripeGuestCustomerAtom } from '../lib/store';

export default function OrderReviewCard() {
    const [cart, setCart] = useAtom(cartAtom);
    const [shippingInfo, setShippingInfo] = useAtom(shippingInfoAtom);
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

    return (
        <div className='mt-10 h-fit w-full'>
            <h1 className="mt-8 text-3xl text-gray-900 font-semibold">
                Order Details
            </h1>

            <p className="mt-2 text-sm text-gray-600">
                Thanks for shopping with us {shippingInfo?.firstName} 👋 <br />
                Your order is on it's way!
            </p>

            <div className='mt-12 space-y-2.5'>
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

            <div className='mt-12 space-y-2.5'>
                <h2 className='text-sm text-gray-900 font-semibold'>Shipping Info</h2>

                <div>
                    <p className='text-sm text-gray-600'>{shippingInfo?.phone}</p>
                    <p className='text-sm capitalize text-gray-600'>{shippingInfo?.address}</p>
                    <p className='text-sm capitalize text-gray-600'>{shippingInfo?.city}, {shippingInfo?.country}</p>
                </div>

            </div>

        </div>
    );
}
