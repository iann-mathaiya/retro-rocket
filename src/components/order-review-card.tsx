import { useAtom } from 'jotai';
import { shippingInfoIdAtom } from '../lib/store';
import { useEffect } from 'react';

export default function OrderReviewCard() {
    const [shippingInfoId, setShippingInfoId] = useAtom(shippingInfoIdAtom);

    useEffect(() => {
        const shippingInfoId = localStorage.getItem('shipping-info-id') ?? '';
        setShippingInfoId(shippingInfoId);
    }, [setShippingInfoId]);


    return (
        <div className='mt-10 h-fit w-full'>
            <p>{shippingInfoId}</p>
        </div>
    );
}
