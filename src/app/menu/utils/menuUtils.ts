import { MenuItem } from '../types/menu';

export function formatDietaryTag(tag: string): string {
  const tagMap: { [key: string]: string } = {
    gluten_free: 'GF',
    soy_free: 'SF',
    nut_free: 'NF',
    spicy: 'Spicy',
  };
  return tagMap[tag] || tag;
}

export function filterMenuItems(
  menuItems: MenuItem[],
  activeCategory: string,
  activeDietaryFilter: string,
  searchQuery: string
): MenuItem[] {
  let filtered = [...menuItems];

  if (activeCategory !== 'All') {
    filtered = filtered.filter((item) => item.category === activeCategory);
  }

  if (activeDietaryFilter !== 'All') {
    const filterTag = activeDietaryFilter.toLowerCase().replace(' ', '_');
    filtered = filtered.filter((item) =>
      item.dietaryTags.some((tag) => tag.toLowerCase() === filterTag)
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keyIngredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query)
        )
    );
  }
  return filtered;
}