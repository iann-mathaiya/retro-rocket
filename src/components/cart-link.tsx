import { useAtom, useSetAtom } from "jotai";
import { cartAtom } from "../lib/store";
import { useEffect } from "react";

type CartLinkProps = {
  pathname: string;
};

export default function CartLink({ pathname }: CartLinkProps) {
  const [cart, setCart] = useAtom(cartAtom);

  // console.log(pathname)

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [setCart]);

  return (
    <a
      href="/shop/cart" data-active={pathname === '/shop/cart'} data-has-items={cart.length > 0}
      className="relative text-sm text-gray-600 hover:text-orange-600 data-[active=true]:text-orange-600 data-[has-items=true]:text-gray-900">
      <span>Cart</span>
      {cart.length > 0 &&
        <span className="w-4 h-4 absolute -right-4 -top-1 flex items-center justify-center text-xs text-white bg-orange-600 rounded-full">
          {cart.length}
        </span>
      }
    </a>
  );
}
