import { useAtom } from "jotai";
import { cartAtom } from "../lib/store";

type QuantityCounterProps = {
    itemId: string;
    itemQuantity: number;
};

export default function QuantityCounter({itemId, itemQuantity}: QuantityCounterProps) {
    const [cart, setCart] = useAtom(cartAtom);

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

    return (
        <div className='flex items-center'>
            <button type="button" onClick={() => updateQuantity(itemId, itemQuantity - 1)} disabled={itemQuantity === 1}
                className='w-7 h-7 bg-gray-300/60 text-base text-gray-600 hover:text-gray-900 flex items-center justify-center rounded-l-md hover:cursor-pointer disabled:cursor-not-allowed'>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24">
                    <title>subtract icon</title>
                    <path fill="currentColor" d="M5 11v2h14v-2z" />
                </svg>
            </button>

            <input type="number" value={itemQuantity} onChange={(e) => handleQuantityInput(itemId, e)} min="1" className='min-w-7 w-7 h-7 text-center bg-gray-300/60 outline outline-none' />

            <button type="button" onClick={() => updateQuantity(itemId, itemQuantity + 1)} className='w-7 h-7 bg-gray-300/60 text-base text-gray-600 hover:text-gray-900 flex items-center justify-center rounded-r-md hover:cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5' viewBox="0 0 24 24">
                    <title>add icon</title>
                    <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                </svg>
            </button>
        </div>
    );
}
