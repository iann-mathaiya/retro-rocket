import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { actions } from 'astro:actions';
import { cartAtom, shippingInfoIdAtom, stripeCheckoutSessionAtom, stripeCheckoutSessionIdAtom, stripeGuestCustomerAtom } from '../lib/store';

export default function OrderReviewCard() {
    const [cart, setCart] = useAtom(cartAtom);
    const [shippingInfoId, setShippingInfoId] = useAtom(shippingInfoIdAtom);
    const [stripeCheckoutSessionId, setStripeCheckoutSessionId] = useAtom(stripeCheckoutSessionIdAtom);
    const [stripeCheckoutSession, setStripeCheckoutSession] = useAtom(stripeCheckoutSessionAtom);
    const [stripeGuestCustomer, setStripeGuestCustomer] = useAtom(stripeGuestCustomerAtom);

    useEffect(() => {
        const newShippingInfoId = localStorage.getItem('shipping-info-id') ?? '';
        const newstripeCheckoutSessionId = localStorage.getItem('stripe-checkout-session-id') ?? '';
        setShippingInfoId(newShippingInfoId);
        setStripeCheckoutSessionId(newstripeCheckoutSessionId);

        async function retrieveStripeSession() {
            if (stripeCheckoutSessionId) {
                const { data, error } = await actions.checkout.retrieveCheckoutSession({ sessionId: stripeCheckoutSessionId });

                if (data?.success) {
                    setStripeCheckoutSession(data.session);
                }
            }
        }

        retrieveStripeSession();

        if (stripeCheckoutSession && (stripeCheckoutSession.customer === null) && stripeCheckoutSession.customer_details) {
            const guestCustomer = {
                name: stripeCheckoutSession.customer_details.name,
                email: stripeCheckoutSession.customer_details.email,
                phone: stripeCheckoutSession.customer_details.phone,
                address: stripeCheckoutSession.customer_details.address,
            };

            setStripeGuestCustomer(guestCustomer);

        }
    }, [stripeCheckoutSession, stripeCheckoutSessionId, setShippingInfoId, setStripeCheckoutSessionId, setStripeCheckoutSession, setStripeGuestCustomer]);

    return (
        <div className='mt-10 h-fit w-full'>
            <h1 className="mt-8 text-3xl text-gray-900 font-semibold">
                Order Details
            </h1>

            <p className="mt-2 text-sm text-gray-600">
                Thanks for shopping with us, your order is on it's way!
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

            </div>

            {/* <p>{shippingInfoId}</p>
            <p>{stripeCheckoutSessionId}</p> */}

            {/* <pre>{JSON.stringify(stripeGuestCustomer, null, 2)}</pre>
            <pre>{JSON.stringify(cart, null, 2)}</pre> */}

        </div>
    );
}
