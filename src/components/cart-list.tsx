import { useAtom } from 'jotai';
import { cartAtom } from '../lib/store';
import { useEffect, useState } from 'react';

export default function CartList() {
    const [cart, setCart] = useAtom(cartAtom);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        const subTotal = cart.reduce((acc, item) => acc + (item.price as number) * item.quantity, 0);
        setSubTotal(subTotal);
    }, [cart]);

    function updateQuantity(itemId: string, newQuantity: number) {
        if (newQuantity < 1) return;

        const updatedCart = cart.map((cartItem) =>
            cartItem.id === itemId
                ? { ...cartItem, quantity: newQuantity, totalPrice: newQuantity * (cartItem.price as number) }
                : cartItem
        );

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    function handleQuantityInput(itemId: string, event: React.ChangeEvent<HTMLInputElement>) {
        const value = Number.parseInt(event.target.value);
        if (!Number.isNaN(value)) {
            updateQuantity(itemId, value);
        }
    }

    function removeItem(itemId: string) {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    return (
        <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8'>
            <ul className='sm:col-span-2 w-full'>
                {cart.map((item) => (
                    <li key={item.id} className='group flex items-center sm:items-start gap-4'>
                        <img src={item.imageSrc} alt={item.name} className='w-40 aspect-square object-cover object-center group-hover:scale-110 transition-all duration-300 ease-in-out' />

                        <div className='w-full'>
                            <div className='sm:mt-10 w-full flex flex-col sm:flex-row justify-between'>
                                <h1 className="text-xl text-gray-900 font-medium">{item.name}</h1>
                                <p className="text-xl text-gray-900 font-medium">
                                    ${item.totalPrice}.00
                                </p>
                            </div>

                            <div className='mt-3 flex items-center gap-4'>
                                <div className='flex items-center'>
                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}
                                        className='w-7 h-7 bg-gray-300/60 text-base text-gray-600 hover:text-gray-900 flex items-center justify-center rounded-l-md hover:cursor-pointer disabled:cursor-not-allowed'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24">
                                            <title>subtract icon</title>
                                            <path fill="currentColor" d="M5 11v2h14v-2z" />
                                        </svg>
                                    </button>

                                    <input type="number" value={item.quantity} onChange={(e) => handleQuantityInput(item.id, e)} min="1" className='min-w-7 w-7 h-7 text-center bg-gray-300/60 outline outline-none' />

                                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className='w-7 h-7 bg-gray-300/60 text-base text-gray-600 hover:text-gray-900 flex items-center justify-center rounded-r-md hover:cursor-pointer'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24">
                                            <title>add icon</title>
                                            <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                                        </svg>
                                    </button>
                                </div>

                                <button type="button" onClick={() => removeItem(item.id)} className="text-sm text-gray-600  hover:text-red-600 hover:cursor-pointer">
                                    Remove
                                </button>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>

            <div className='mt-10 h-fit w-full'>
                <h2 className='mt-4 sm:mt-0 text-sm text-gray-600 font-medium'>Order Summary</h2>

                <div className='mt-2 flex justify-between items-center'>
                    <h3 className='text-base text-gray-700 font-medium'>Sub-total</h3>
                    <p className='text-base text-gray-700 font-medium'>${subTotal}.00</p>
                </div>

                <div className='mt-2 flex justify-between items-center'>
                    <h3 className='text-base text-gray-700 font-medium'>Discount</h3>
                    <p className='text-base text-gray-700 font-medium'>$0.00</p>
                </div>

                <div className='mt-2 flex justify-between items-center border-t border-gray-400/35 pt-2'>
                    <h3 className='text-xl text-gray-900 font-medium'>Total</h3>
                    <p className='text-xl text-gray-900 font-medium'>
                        ${subTotal - discount}.00
                    </p>
                </div>

                <button type="button" className='mt-4 w-full py-2 px-8 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 hover:cursor-pointer rounded-full transition-all duration-500 ease-in-out'>
                    Proceed to checkout
                </button>
            </div>
        </div>
    );
}
