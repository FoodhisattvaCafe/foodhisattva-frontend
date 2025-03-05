import { cn } from '@/lib/utils';
import { categories, categoryIcons } from '../constants/menuConstants';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryTabs({
  activeCategory,
  setActiveCategory,
}: CategoryTabsProps) {
  return (
    <Tabs
      value={activeCategory}
      onValueChange={(value: string) => setActiveCategory(value)}
    >
      <TabsList className="flex overflow-x-auto space-x-3 py-6 mb-12 scrollbar-hide">
        {categories.map((category: string) => (
          <TabsTrigger
            key={category}
            value={category}
            className={cn(
              'cursor-pointer flex items-center space-x-2 px-8 py-4 rounded-full text-base font-medium transition-colors',
              'data-[state=active]:bg-accent-primary data-[state=active]:text-white data-[state=active]:shadow-md',
              'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
          >
            {categoryIcons[category] && <span>{categoryIcons[category]}</span>}
            <span>{category}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}


