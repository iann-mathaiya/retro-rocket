import { countries as countriesJSON } from 'countries-list';
import type { OrderItem } from './types';
import type Stripe from 'stripe';

export const countries = Object.entries(countriesJSON).map(([code, country]) => ({
  code: code,
  name: country.name,
})).sort((a, b) => a.name.localeCompare(b.name));


export function checkExistingOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem('order-items') || '[]');
    return orders.length > 0;
  } catch (error) {
    console.error('Error checking orders:', error);
    return false;
  }
};

export function getAllOrders() {
  try {
    return JSON.parse(localStorage.getItem('order-items') || '[]');
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return [];
  }
};

export function transformOrderData(data: Stripe.ApiList<Stripe.LineItem>): OrderItem[] {
  return data.data.map((item) => ({
    id: item.id,
    name: typeof item.price?.product === 'object' && 'name' in item.price.product ? item.price.product.name : '',
    quantity: item.quantity,
    amount_discount: item.amount_discount,
    amount_total: item.amount_total / 100,
    amount_subtotal:item.amount_subtotal / 100,
    images: typeof item.price?.product === 'object' && 'images' in item.price.product ? item.price.product.images : [],
    metadata: typeof item.price?.product === 'object' && 'metadata' in item.price.product ? item.price.product.metadata : {},
  }));
}