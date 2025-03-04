import { ObjectId } from 'mongodb';

export interface MenuItem {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  keyIngredients: string[];
  dietaryTags: string[];
  featured?: boolean;
  available?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Valid categories for menu items
export const MenuCategories = [
  'Starters',
  'Main Dishes',
  'Signature Bowls',
  'Desserts',
  'Drinks'
];

// Valid dietary tags
export const DietaryTags = [
  { id: 'gluten_free', label: 'Gluten Free', shortCode: 'GF' },
  { id: 'soy_free', label: 'Soy Free', shortCode: 'SF' },
  { id: 'nut_free', label: 'Nut Free', shortCode: 'NF' },
  { id: 'spicy', label: 'Spicy', shortCode: 'Spicy' }
];

// Helper function to format dietary tags for display
export const formatDietaryTag = (tag: string): string => {
  const tagMap: { [key: string]: string } = {
    'gluten_free': 'GF',
    'soy_free': 'SF',
    'nut_free': 'NF',
    'spicy': 'Spicy'
  };
  return tagMap[tag] || tag;
};

// Helper function to validate a menu item
export function validateMenuItem(item: Partial<MenuItem>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields
  if (!item.name || item.name.trim() === '') errors.push('Name is required');
  if (!item.description || item.description.trim() === '') errors.push('Description is required');
  if (item.price === undefined || item.price < 0) errors.push('Valid price is required');
  if (!item.category || !MenuCategories.includes(item.category)) errors.push('Valid category is required');
  
  // Validate dietary tags if present
  if (item.dietaryTags) {
    const validTagIds = DietaryTags.map(tag => tag.id);
    const invalidTags = item.dietaryTags.filter(tag => !validTagIds.includes(tag));
    if (invalidTags.length > 0) {
      errors.push(`Invalid dietary tags: ${invalidTags.join(', ')}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}