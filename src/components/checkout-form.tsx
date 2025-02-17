import type React from 'react';
import { useState, type InputHTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { actions } from 'astro:actions';
import { cartAtom } from '../lib/store';
import { countries } from '../lib/utils';

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
    const { error } = await actions.checkout.saveShippingInformation(formData);

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

      <div className='pb-12 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8'>
        <form className='sm:col-span-2 w-full mt-4 space-y-4' onSubmit={handleCheckout}>
          <div className='w-full flex items-center gap-4'>
            <FormInput label='First Name' name='firstName' />
            <FormInput label='Last Name' name='lastName' />
          </div>

          <FormInput label='Email' name='email' type='email' />

          <div className='flex flex-col space-y-1'>
            <label htmlFor='country' className='text-xs text-gray-600'>Country</label>
            <select id='country' name='country' 
              className='w-full py-2 px-2.5 text-sm text-gray-900 font-medium border border-gray-400/35 focus:border-orange-500 rounded-md focus:outline-[2.5px] focus:outline-orange-500/20'>
              <option value=''>Select a country</option>
              {countries.map((country) =>
                <option key={country.code} value={country.code}>{country.name}</option>
              )}
            </select>
          </div>

          <FormInput label='Phone' name='phone' />

          <FormInput label='State' name='state' />

          <FormInput label='Address' name='address' />

          <FormInput label='City' name='city' />

          <FormInput label='ZIP Code' name='zip' />

          <button type="submit" disabled={isLoading} className='mt-4 w-full py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white text-sm bg-gray-950 hover:bg-orange-600 disabled:hover:bg-gray-900 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed rounded-lg transition-all duration-500 ease-in-out'>
            {isLoading ? 'Processing...' : 'Continue to payment'}
          </button>
        </form>
      </div>
    </>
  );
}

type FormInputProps = {
  label: string;
  name: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>;

function FormInput({ label, name, className = '', ...props }: FormInputProps) {
  return (
    <div className='w-full flex flex-col space-y-1'>
      <label htmlFor={name} className='text-xs text-gray-600'>{label}</label>
      <input
        id={name}
        name={name}
        {...props}
        className={`w-full py-2 px-2.5 text-sm text-gray-900 font-medium border border-gray-400/35 focus:border-orange-500 rounded-md focus:outline-[2.5px] focus:outline-orange-500/20 ${className}`}
      />
    </div>
  );
}
