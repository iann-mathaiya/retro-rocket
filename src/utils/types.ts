
export type StripeProduct = {
    id: string;
    name: string;
    active: boolean;
    images: string[];
    description: string | null;
    metadata?: Record<string, string | number>
    default_price: {
      unit_price: number | string | undefined | null;
      currency: string | undefined | null;
    } | string | number | undefined | null;
  };