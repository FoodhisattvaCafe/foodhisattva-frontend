'use client';

import { useState, useEffect, useDeferredValue, useMemo, useCallback } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dynamic from 'next/dynamic';

// Import layout components
import MainHead from '@/components/features/MainHead';
import Footer from '@/components/features/Footer';

import MenuHero from '@/app/menu/components/MenuHero';
import SearchBar from '@/app/menu/components/SearchBar';
import DietaryFilters from '@/app/menu/components/DietaryFilters';
import CategoryTabs from '@/app/menu/components/CategoryTabs';
import MenuGrid from '@/app/menu/components/MenuGrid';

// Import utils and types
import { filterMenuItems } from '@/app/menu/utils/menuUtils';
import { MenuItem } from '@/app/menu/types/menu';


// Dynamically import modal component
const FoodModal = dynamic(() => import('@/components/features/FoodModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR for modal
});

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeDietaryFilter, setActiveDietaryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cart context
  const { addToCart } = useCart();

  // Fetch menu items from API
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        // Ensure _id is a string for React keys
        const items = data.map((item: any) => ({
          ...item,
          _id: item._id.toString(),
        })) as MenuItem[];
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast.error('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  // Compute filtered items using useMemo for better performance
  const filteredItems = useMemo(() => {
    return filterMenuItems(
      menuItems,
      activeCategory,
      activeDietaryFilter,
      deferredSearchQuery
    );
  }, [menuItems, activeCategory, activeDietaryFilter, deferredSearchQuery]);

  // Reset filters handler
  const handleReset = useCallback(() => {
    setActiveCategory('All');
    setActiveDietaryFilter('All');
    setSearchQuery('');
  }, []);

  // Add item to cart with toast notification
  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      try {
        const cartItem = { ...item, quantity: 1 };
        addToCart(cartItem);
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
    },
    [addToCart]
  );

  return (
    <TooltipProvider>
      <>
        {/* Main header */}
        <MainHead />

        <main className="min-h-screen bg-gradient-to-b from-teal-900 to-teal-700 pt-20">
          {/* Hero Section */}
          <MenuHero />

          {/* Search & Filter Section */}
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl -mt-6 pt-12 px-6 md:px-12 pb-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                {/* Search Input */}
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                {/* Dietary Filters & Reset */}
                <DietaryFilters 
                  activeDietaryFilter={activeDietaryFilter}
                  setActiveDietaryFilter={setActiveDietaryFilter}
                  handleReset={handleReset}
                />
              </div>

              {/* Category Tabs */}
              <CategoryTabs
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />

              {/* Menu Items Grid */}
              <MenuGrid
                loading={loading}
                filteredItems={filteredItems}
                handleReset={handleReset}
                onSelectItem={(item: MenuItem) => {
                  setSelectedItem(item);
                  setIsModalOpen(true);
                }}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </main>

        <Footer />

        {/* Food Modal */}
        {isModalOpen && (
          <FoodModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            menuItem={selectedItem}
          />
        )}
      </>
    </TooltipProvider>
  );
}