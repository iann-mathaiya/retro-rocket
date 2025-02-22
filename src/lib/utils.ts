import { countries as countriesJSON } from 'countries-list';

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