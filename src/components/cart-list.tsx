import { useAtom } from 'jotai';
import { cartAtom } from '../lib/store';
import QuantityCounter from './quantity-counter';
import OrderSummaryCard from './order-summary-card';

export default function CartList() {
    const [cart, setCart] = useAtom(cartAtom);

    console.log(cart);

    function removeItem(itemId: string) {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    if (cart.length === 0) {
        return (
            <div>
                <h1 className="mt-8 text-3xl text-gray-900 font-semibold">
                    Your cart is empty
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    Free delivery and free returns on orders placed on February 29th.
                </p>

                <div className='mt-8'>
                    <a href="/" className='w-fit py-1.5 px-6 min-h-8 flex items-center justify-center gap-2 text-white bg-gray-950 hover:bg-orange-600 disabled:hover:bg-gray-900 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed rounded-full transition-all duration-500 ease-in-out'>
                        Continue shopping
                    </a>
                </div>

            </div>
        );
    }

    return (
        <>
            <h1 className="mt-8 text-3xl text-gray-900 font-semibold">
                Review your cart
            </h1>

            <p className="mt-2 text-sm text-gray-600">
                Free delivery and free returns on orders placed on February 29th.
            </p>

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
                                    <QuantityCounter itemId={item.id} itemQuantity={item.quantity} />

                                    <button type="button" onClick={() => removeItem(item.id)} className="text-sm text-gray-600  hover:text-red-600 hover:cursor-pointer">
                                        Remove
                                    </button>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>

                <OrderSummaryCard />

            </div>
        </>
    );
}
