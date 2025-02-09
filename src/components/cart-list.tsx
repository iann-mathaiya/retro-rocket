import { useAtom } from 'jotai';
import { useState } from 'react';
import { cartAtom } from '../lib/store';

export default function CartList() {
    const [cart, setCart] = useAtom(cartAtom);
    const [quantity, setQuantity] = useState(1);

    function updateQuantity(itemId: string, newQuantity: number) {
        if (newQuantity < 1) return;
        setQuantity(newQuantity);

        const updatedCart = cart.map((cartItem) =>
            cartItem.id === itemId
                ? { ...cartItem, quantity: newQuantity }
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

    return (
        <ul className='w-full max-w-2xl'>
            {cart.map((item) => (
                <li key={item.id} className='group flex flex-col sm:flex-row gap-4'>
                    <img src={item.imageSrc} alt={item.name} className='w-40 aspect-square object-cover object-center group-hover:scale-110 transition-all duration-300 ease-in-out' />

                    <div className='w-full'>
                        <div className='sm:mt-10 w-full flex justify-between'>
                            <h1 className="text-xl text-gray-900 font-medium">{item.name}</h1>
                            <p className="text-xl text-gray-900 font-medium">${item.price}.00</p>
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

                            <button type="button" className="text-sm text-gray-600  hover:text-red-600 hover:cursor-pointer">
                                Remove
                            </button>
                        </div>

                    </div>
                </li>
            ))}
        </ul>
    );
}
