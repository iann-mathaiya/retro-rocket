import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { actions } from 'astro:actions';
import { shippingInfoIdAtom, stripeCheckoutSessionAtom, stripeCheckoutSessionIdAtom, stripeGuestCustomerAtom } from '../lib/store';

export default function OrderReviewCard() {
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
            if(stripeCheckoutSessionId){
                const { data, error } = await actions.checkout.retrieveCheckoutSession({ sessionId: stripeCheckoutSessionId });

                if(data?.success) {
                    setStripeCheckoutSession(data.session); 
                }
            }
        }

        retrieveStripeSession()

        if(stripeCheckoutSession && (stripeCheckoutSession.customer === null) && stripeCheckoutSession.customer_details) {
            const guestCustomer = {
                name: stripeCheckoutSession.customer_details.name,
                email: stripeCheckoutSession.customer_details.email,
                phone: stripeCheckoutSession.customer_details.phone,
                address: stripeCheckoutSession.customer_details.address,
            }

            setStripeGuestCustomer(guestCustomer);

        }
    }, [stripeCheckoutSession, stripeCheckoutSessionId, setShippingInfoId, setStripeCheckoutSessionId, setStripeCheckoutSession, setStripeGuestCustomer]);


    return (
        <div className='mt-10 h-fit w-full'>
            <p>{shippingInfoId}</p>
            <p>{stripeCheckoutSessionId}</p>
            
            <pre>{JSON.stringify(stripeGuestCustomer, null, 2)}</pre>
        </div>
    );
}
