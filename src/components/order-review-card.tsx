import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { shippingInfoIdAtom, stripeCheckoutSessionAtom, stripeCheckoutSessionIdAtom } from '../lib/store';
import { actions } from 'astro:actions';

export default function OrderReviewCard() {
    const [shippingInfoId, setShippingInfoId] = useAtom(shippingInfoIdAtom);
    const [stripeCheckoutSessionId, setStripeCheckoutSessionId] = useAtom(stripeCheckoutSessionIdAtom);
    const [stripeCheckoutSession, setStripeCheckoutSession] = useAtom(stripeCheckoutSessionAtom);

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
    }, [stripeCheckoutSessionId, setShippingInfoId, setStripeCheckoutSessionId, setStripeCheckoutSession]);


    return (
        <div className='mt-10 h-fit w-full'>
            <p>{shippingInfoId}</p>
            <p>{stripeCheckoutSessionId}</p>
            
            <pre>{JSON.stringify(stripeCheckoutSession, null, 2)}</pre>
        </div>
    );
}
