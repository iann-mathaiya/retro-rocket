import type Stripe from "stripe";

export type StripeProduct = {
  id: string;
  name: string;
  active: boolean;
  images: string[];
  description: string | null;
  metadata?: Record<string, string | number>;
  default_price: {
    id: string | undefined;
    unit_price: number | string | undefined | null;
    currency: string | undefined | null;
  } | string | number | undefined | null;
};

export type CartItem = {
  id: string;
  name: string;
  imageSrc: string;
  quantity: number;
  priceId: string;
  price: number | string;
  totalPrice: number | string;
};

export type GuestCustomer = {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: Stripe.Address | null;
};

export type LocalOrder = {
  items: CartItem[];
  orderedAt: string;
  orderId: string;
};