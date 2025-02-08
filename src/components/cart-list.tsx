import { useAtomValue } from 'jotai';
import { cartAtom } from '../lib/store';

export default function CartList() {
    const cart = useAtomValue(cartAtom);
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

                    </div>
                </li>
            ))}
            <pre>{JSON.stringify(cart, null, 2)}</pre>
        </ul>
    );
}
