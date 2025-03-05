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
import { MenuItem, CartItem } from '@/app/menu/types/menu';

// Dynamically import modal component
const FoodModal = dynamic(() => import('@/components/features/FoodModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

// Updated menu items with new interface
const initialMenuItems: MenuItem[] = [
  {
    _id: '1',
    name: 'Crispy Vegetable Spring Rolls',
    description: 'Handmade spring rolls with mixed vegetables, served with sweet chili sauce',
    price: 8.99,
    category: 'Appetizers',
    dietaryTags: ['Vegetarian', 'Vegan'],
    keyIngredients: ['Mixed Vegetables', 'Rice Paper', 'Sweet Chili Sauce'],
    image: '/images/food-1.png'
  },
  {
    _id: '2',
    name: 'Truffle Parmesan Fries',
    description: 'Crispy golden fries topped with truffle oil and freshly grated parmesan',
    price: 10.99,
    category: 'Appetizers',
    dietaryTags: ['Vegetarian'],
    keyIngredients: ['Potatoes', 'Truffle Oil', 'Parmesan Cheese'],
    image: '/images/food-2.png'
  },
  {
    _id: '10',
    name: 'Spicy Buffalo Wings',
    description: 'Crispy chicken wings tossed in house-made buffalo sauce',
    price: 12.99,
    category: 'Appetizers',
    dietaryTags: ['Spicy'],
    keyIngredients: ['Chicken Wings', 'Buffalo Sauce', 'Celery Sticks'],
    image: '/images/food-3.png'
  },
  
  // Main Courses
  {
    _id: '3',
    name: 'Grilled Salmon Quinoa Bowl',
    description: 'Sustainably sourced salmon served over quinoa with roasted vegetables',
    price: 18.99,
    category: 'Main Courses',
    dietaryTags: ['Gluten-Free', 'Pescatarian'],
    keyIngredients: ['Salmon', 'Quinoa', 'Roasted Vegetables', 'Herb Dressing'],
    image: '/images/food-4.png'
  },
  {
    _id: '4',
    name: 'Beyond Meat Vegan Burger',
    description: 'Plant-based burger with vegan cheese, lettuce, tomato, and avocado spread',
    price: 16.99,
    category: 'Main Courses',
    dietaryTags: ['Vegan', 'Vegetarian'],
    keyIngredients: ['Beyond Meat Patty', 'Vegan Cheese', 'Lettuce', 'Tomato', 'Avocado Spread'],
    image: '/images/food-5.png'
  },
  {
    _id: '5',
    name: 'Chicken Tikka Masala',
    description: 'Classic Indian curry with tender chicken, served with basmati rice',
    price: 17.99,
    category: 'Main Courses',
    dietaryTags: ['Spicy'],
    keyIngredients: ['Chicken', 'Tomato Sauce', 'Cream', 'Basmati Rice', 'Garam Masala'],
    image: '/images/food-6.png'
  },

  // Desserts
  {
    _id: '6',
    name: 'Vegan Chocolate Mousse',
    description: 'Rich and creamy dark chocolate mousse made with coconut cream',
    price: 7.99,
    category: 'Desserts',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    keyIngredients: ['Dark Chocolate', 'Coconut Cream', 'Agave Syrup'],
    image: '/images/food-1.png'
  },
  {
    _id: '7',
    name: 'Classic New York Cheesecake',
    description: 'Traditional cheesecake with graham cracker crust and berry compote',
    price: 8.99,
    category: 'Desserts',
    dietaryTags: [],
    keyIngredients: ['Cream Cheese', 'Graham Cracker', 'Mixed Berries'],
    image: '/images/food-2.png'
  },

  // Drinks
  {
    _id: '8',
    name: 'Green Detox Smoothie',
    description: 'Blend of spinach, kale, apple, and banana with a hint of ginger',
    price: 6.99,
    category: 'Drinks',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    keyIngredients: ['Spinach', 'Kale', 'Apple', 'Banana', 'Ginger'],
    image: '/images/food-3.png'
  },
  {
    _id: '9',
    name: 'Cold Brew Coffee',
    description: 'Smooth, slow-steeped cold brew with optional dairy-free milk',
    price: 4.99,
    category: 'Drinks',
    dietaryTags: ['Dairy-Free Option'],
    keyIngredients: ['Coffee Beans', 'Water', 'Optional Dairy-Free Milk'],
    image: '/images/food-4.png'
  }
];

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

  // Simulate API fetch with initial menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setMenuItems(initialMenuItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast.error('Failed to load menu. Please try again later.');
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
        const cartItem: CartItem = { ...item, quantity: 1 };
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

  // Rest of the component remains the same...
  return (
    <TooltipProvider>
      <>
        <MainHead />

        <main className="min-h-screen bg-gradient-to-b from-teal-900 to-teal-700 pt-20">
          <MenuHero />

          <div className="bg-white dark:bg-gray-900 rounded-t-3xl -mt-6 pt-12 px-6 md:px-12 pb-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />

                <DietaryFilters 
                  activeDietaryFilter={activeDietaryFilter}
                  setActiveDietaryFilter={setActiveDietaryFilter}
                  handleReset={handleReset}
                />
              </div>

              <CategoryTabs
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />

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
