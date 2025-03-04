import { ChefHat, Utensils, Salad, Sparkles, Thermometer } from 'lucide-react';

export const categories: string[] = [
  'All',
  'Starters',
  'Main Dishes',
  'Signature Bowls',
  'Desserts',
  'Drinks',
];

export const dietaryFilters: string[] = ['All', 'Gluten Free', 'Soy Free', 'Nut Free', 'Spicy'];

export const categoryIcons: { [key: string]: JSX.Element } = {
  All: <ChefHat size={16} />,
  Starters: <ChefHat size={16} />,
  'Main Dishes': <Utensils size={16} />,
  'Signature Bowls': <Salad size={16} />,
  Desserts: <Sparkles size={16} />,
  Drinks: <Thermometer size={16} />,
};

export const dietaryTagMap: { [key: string]: string } = {
  gluten_free: 'GF',
  soy_free: 'SF',
  nut_free: 'NF',
  spicy: 'Spicy',
};