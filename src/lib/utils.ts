import { countries as countriesJSON } from 'countries-list';

export const countries = Object.entries(countriesJSON).map(([code, country]) => ({
  code: code,
  name: country.name,
})).sort((a, b) => a.name.localeCompare(b.name));