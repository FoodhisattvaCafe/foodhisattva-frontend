import { ObjectId } from 'mongodb';

/**
 * @interface MenuItem
 * @description
 * Represents a single item on the menu.
 */
export interface MenuItem {
  /** MongoDB ObjectId */
  _id?: ObjectId;
  /** Name of the menu item */
  name: string;
  /** Description of the dish */
  description: string;
  /** Price in USD */
  price: number;
  /** Category this item belongs to */
  category: string;
  /** Image URL for the item */
  image: string;
  /** List of main ingredients */
  keyIngredients: string[];
  /** List of dietary tag IDs */
  dietaryTags: string[];
  /** Whether the item is featured on the homepage */
  featured?: boolean;
  /** Whether the item is currently available */
  available?: boolean;
  /** Date the item was created */
  createdAt?: Date;
  /** Date the item was last updated */
  updatedAt?: Date;
}

/**
 * @constant MenuCategories
 * @description
 * List of valid categories used to group menu items.
 */
export const MenuCategories = [
  'Starters',
  'Main Dishes',
  'Signature Bowls',
  'Desserts',
  'Drinks'
];

/**
 * @constant DietaryTags
 * @description
 * Predefined dietary tag options with display labels and short codes.
 */
export const DietaryTags = [
  { id: 'gluten_free', label: 'Gluten Free', shortCode: 'GF' },
  { id: 'soy_free', label: 'Soy Free', shortCode: 'SF' },
  { id: 'nut_free', label: 'Nut Free', shortCode: 'NF' },
  { id: 'spicy', label: 'Spicy', shortCode: 'Spicy' }
];

/**
 * @function formatDietaryTag
 * @description
 * Converts a dietary tag ID into its display short code.
 *
 * @param {string} tag - The ID of the dietary tag (e.g., 'gluten_free').
 * @returns {string} - The short code (e.g., 'GF') or the original tag if not found.
 */
export const formatDietaryTag = (tag: string): string => {
  const tagMap: { [key: string]: string } = {
    'gluten_free': 'GF',
    'soy_free': 'SF',
    'nut_free': 'NF',
    'spicy': 'Spicy'
  };
  return tagMap[tag] || tag;
};

/**
 * @function validateMenuItem
 * @description
 * Validates a partial MenuItem object to ensure required fields are present and correctly formatted.
 *
 * @param {Partial<MenuItem>} item - The menu item object to validate.
 * @returns {{ valid: boolean, errors: string[] }} - Whether the item is valid and any validation error messages.
 */
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
