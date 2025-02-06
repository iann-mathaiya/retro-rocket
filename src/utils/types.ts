
export type StripeProduct = {
    id: string;
    name: string;
    description: string | null;
    default_price: string | undefined;
    images: string[];
    active: boolean;
  };