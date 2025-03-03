'use client';

import { useState, useEffect, useDeferredValue } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Sparkles, ChefHat, Salad, Utensils, Flame, Thermometer } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import MainHead from '@/components/features/MainHead';
import Footer from '@/components/features/Footer';
import FoodModal from '@/components/features/FoodModal';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the MenuItem interface
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dietaryTags: string[];
  keyIngredients: string[];
  image?: string;
}

// Ensure these arrays are typed as string[]
const categories: string[] = [
  'All',
  'Starters',
  'Main Dishes',
  'Signature Bowls',
  'Desserts',
  'Drinks',
];

const dietaryFilters: string[] = ['All', 'Gluten Free', 'Soy Free', 'Nut Free', 'Spicy'];

// Icons mapped to categories
const categoryIcons: { [key: string]: JSX.Element } = {
  All: <ChefHat size={16} />,
  Starters: <ChefHat size={16} />,
  'Main Dishes': <Utensils size={16} />,
  'Signature Bowls': <Salad size={16} />,
  Desserts: <Sparkles size={16} />,
  Drinks: <Thermometer size={16} />,
};

export default function MenuPage() {
  // State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cart context
  const { addToCart } = useCart();

  // Intersection Observer (optional)
  const { ref: inViewRef } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu items');

        const data = await response.json();
        // Convert the _id to a string for React keys
        const items = data.map((item: any) => ({
          ...item,
          _id: item._id.toString(),
        })) as MenuItem[];

        setMenuItems(items);
        setFilteredItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast.error('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter items whenever relevant states change
  useEffect(() => {
    let filtered = [...menuItems];

    if (activeCategory !== 'All') {
      filtered = filtered.filter((item: MenuItem) => item.category === activeCategory);
    }

    if (activeDietaryFilter !== 'All') {
      const filterTag = activeDietaryFilter.toLowerCase().replace(' ', '_');
      filtered = filtered.filter((item: MenuItem) =>
        item.dietaryTags.some((tag: string) => tag.toLowerCase() === filterTag)
      );
    }

    if (deferredSearchQuery) {
      const query = deferredSearchQuery.toLowerCase();
      filtered = filtered.filter((item: MenuItem) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keyIngredients.some((ingredient: string) =>
          ingredient.toLowerCase().includes(query)
        )
      );
    }

    setFilteredItems(filtered);
  }, [menuItems, activeCategory, activeDietaryFilter, deferredSearchQuery]);

  // Reset filters
  const handleReset = () => {
    setActiveCategory('All');
    setActiveDietaryFilter('All');
    setSearchQuery('');
  };

  // Helper to format dietary tags for display
  const formatDietaryTag = (tag: string) => {
    const tagMap: { [key: string]: string } = {
      gluten_free: 'GF',
      soy_free: 'SF',
      nut_free: 'NF',
      spicy: 'Spicy',
    };
    return tagMap[tag] || tag;
  };

  // Add item to cart
  const handleAddToCart = (item: MenuItem) => {
    try {
      const cartItem = { ...item, quantity: 1 };
      addToCart(cartItem);

      // Show success toast with React Toastify
      toast(
        <div>
          <strong>Added to cart</strong>
          <div>{item.name} has been added to your cart</div>
        </div>,
        {
          className: 'bg-green-100 border-green-200',
        }
      );
    } catch (error) {
      // Show error toast
      toast(
        <div>
          <strong>Failed to add item</strong>
          <div>Please try again</div>
        </div>,
        {
          className: 'bg-red-100 border-red-200',
        }
      );
    }
  };

  return (
    <TooltipProvider>
      <>
        {/* Navigation */}
        <MainHead />

        <main className="min-h-screen bg-gradient-to-b from-teal-900 to-teal-700 pt-20">
          {/* Hero Section */}
          <div className="relative py-20 text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Explore Our Menu</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover plant-based cuisine blending Asian traditions with modern innovation.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Badge variant="secondary">
                <ChefHat size={20} />
              </Badge>
              <Badge variant="secondary">
                <Utensils size={20} />
              </Badge>
              <Badge variant="secondary">
                <Salad size={20} />
              </Badge>
              <Badge variant="secondary">
                <Sparkles size={20} />
              </Badge>
              <Badge variant="secondary">
                <Thermometer size={20} />
              </Badge>
            </div>
            <div className="mt-8 animate-bounce">
              <svg
                className="mx-auto w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

          {/* Search & Filter Section */}
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl -mt-6 pt-12 px-6 md:px-12 pb-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                {/* Search Input */}
                <div className="relative flex-1 max-w-lg">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <Input
                    type="search"
                    placeholder="Search dishes, ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-full pl-12 pr-10 h-12"
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                      onClick={() => setSearchQuery('')}
                      title="Clear search"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Dietary Filters & Reset */}
                <div className="flex flex-wrap gap-3">
                  {dietaryFilters.map((filter: string) => (
                    <Tooltip key={filter}>
                      <TooltipTrigger asChild>
                        <button
                          className={cn(
                            'cursor-pointer px-5 py-3 text-sm font-medium rounded-full transition-colors',
                            activeDietaryFilter === filter
                              ? 'bg-accent-primary text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                          )}
                          onClick={() => setActiveDietaryFilter(filter)}
                        >
                          {filter}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Filter by {filter}</TooltipContent>
                    </Tooltip>
                  ))}
                  <button
                    className="cursor-pointer flex items-center px-5 py-3 text-sm font-medium text-accent-primary hover:text-accent-dark dark:text-accent-light border border-accent-primary hover:border-accent-dark dark:border-accent-light rounded-full"
                    onClick={handleReset}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset
                  </button>
                </div>
              </div>

              {/* Category Tabs */}
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

              {/* Menu Items Grid */}
              <LayoutGroup>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                    {Array.from({ length: 6 }).map((_, idx: number) => (
                      <Skeleton key={idx} className="h-64 rounded-lg" />
                    ))}
                  </div>
                ) : filteredItems.length > 0 ? (
                  <AnimatePresence>
                    <motion.div
                      ref={inViewRef}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"
                    >
                      {filteredItems.map((item: MenuItem) => (
                        <motion.div
                          key={item._id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
                        >
                          <BackgroundGradient className="rounded-lg p-0.5">
                            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                              <div
                                className="relative h-48 w-full overflow-hidden cursor-pointer"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setIsModalOpen(true);
                                }}
                              >
                                <Image
                                  src={item.image || '/images/default-food.jpg'}
                                  alt={item.name}
                                  fill
                                  className="object-cover transform hover:scale-105 transition-transform duration-300"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                              <div className="p-5">
                                <div className="flex justify-between items-start">
                                  <h3
                                    className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 cursor-pointer hover:text-accent-primary dark:hover:text-accent-light transition-colors"
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setIsModalOpen(true);
                                    }}
                                  >
                                    {item.name}
                                  </h3>
                                  <span className="text-xl font-bold text-accent-primary dark:text-accent-light">
                                    ${item.price.toFixed(2)}
                                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                  {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {item.dietaryTags.map((tag: string) => (
                                    <Tooltip key={tag}>
                                      <TooltipTrigger asChild>
                                        <span
                                          className={cn(
                                            'text-xs px-2 py-1 rounded cursor-pointer',
                                            tag === 'spicy'
                                              ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                                              : tag === 'gluten_free'
                                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                              : tag === 'soy_free'
                                              ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                                              : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                                          )}
                                        >
                                          {formatDietaryTag(tag)}
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>{tag.replace('_', ' ')}</TooltipContent>
                                    </Tooltip>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between">
                                  <button
                                    className="flex items-center bg-accent-primary hover:bg-accent-dark text-white px-4 py-2 rounded-full transition-colors disabled:opacity-50"
                                    onClick={() => handleAddToCart(item)}
                                    disabled={loading}
                                  >
                                    <Flame size={16} className="mr-2" />
                                    Add to Cart
                                  </button>
                                  <button
                                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                    title="Add to Favorites"
                                  >
                                    <Sparkles size={20} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </BackgroundGradient>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="text-center py-32 px-4">
                    <svg
                      className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      No items found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn&apos;t find any menu items matching your current filters. Try adjusting your
                      search or filters to discover our delicious options.
                    </p>
                    <button
                      className="px-6 py-3 text-base font-medium text-white bg-accent-primary hover:bg-accent-dark rounded-full transition-colors shadow-sm"
                      onClick={handleReset}
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </LayoutGroup>
            </div>
          </div>
        </main>

        <Footer />

        {/* Food Modal */}
        <FoodModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          menuItem={selectedItem}
        />
      </>
    </TooltipProvider>
  );
}
