import { actions } from 'astro:actions';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { cartAtom } from '../lib/store';

export default function CheckoutForm() {
  const cart = useAtomValue(cartAtom);
  const [isLoading, setIsLoading] = useState(false);

  const lineItems = cart.map((item) => ({
    price: item.priceId,
    quantity: item.quantity
  }));

  async function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const { error } = await actions.checkout.saveShippingInformation(formData)

    // const { data, error } = await actions.checkout.createCheckoutSession({
    //   lineItems,
    //   successUrl: `${window.location.origin}/shop/review-order`,
    //   cancelUrl: `${window.location.origin}/shop/cart`,
    // });

    // window.location.href = data?.session?.url as string;
    // setIsLoading(false);

    // console.log({ data, error });
  }
  return (
    <>
      <h1 className="mt-8 text-3xl text-gray-900 font-semibold">
        Shipping information
      </h1>

      <p className="mt-2 text-sm text-gray-600">
        Where should we send your order?
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8'>
        <form className='sm:col-span-2 w-full mt-4 space-y-4' onSubmit={handleCheckout}>
          <div className='flex flex-col space-y-2'>
            <label htmlFor='name' className='text-sm text-gray-700 font-medium'>Full Name</label>
            <input type='text' id='name' name='name' className='w-full py-2 px-4 text-sm text-gray-900 font-medium border border-gray-400/35 rounded-md' />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='email' className='text-sm text-gray-700 font-medium'>Email</label>
            <input type='email' id='email' name='email' className='w-full py-2 px-4 text-sm text-gray-900 font-medium border border-gray-400/35 rounded-md' />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='address' className='text-sm text-gray-700 font-medium'>Address</label>
            <input type='text' id='address' name='address' className='w-full py-2 px-4 text-sm text-gray-900 font-medium border border-gray-400/35 rounded-md' />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='city' className='text-sm text-gray-700 font-medium'>City</label>
            <input type='text' id='city' name='city' className='w-full py-2 px-4 text-sm text-gray-900 font-medium border border-gray-400/35 rounded-md' />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='zip' className='text-sm text-gray-700 font-medium'>ZIP Code</label>
            <input type='text' id='zip' name='zip' className='w-full py-2 px-4 text-sm text-gray-900 font-medium border border-gray-400/35 rounded-md' />
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor='country' className='text-sm text-gray-700 font-medium'>Country</label>
            <select id='country' name='country' className='w-full py-2 px-4 text-sm text-gray-900 font-medium border border-gray-400/35 rounded-md'>
              <option value=''>Select a country</option>
              <option value='us'>United States</option>
              <option value='ca'>Canada</option>
              <option value='mx'>Mexico</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading} className='mt-4 w-full py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 disabled:hover:bg-gray-900 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed rounded-lg transition-all duration-500 ease-in-out'>
            {isLoading ? 'Processing...' : 'Continue to payment'}
          </button>
        </form>
      </div>

    </>
  );
}
