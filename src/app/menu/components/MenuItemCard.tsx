'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDietaryTag } from '../utils/menuUtils';
import { MenuItem } from '../types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  loading: boolean;
}

export default function MenuItemCard({ 
  item, 
  onSelect, 
  onAddToCart, 
  loading 
}: MenuItemCardProps) {
  return (
    <motion.div
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
            onClick={() => onSelect(item)}
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
                onClick={() => onSelect(item)}
              >
                {item.name}
              </h3>
              <span className="text-xl font-bold text-accent-primary dark:text-accent-light">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
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
                onClick={() => onAddToCart(item)}
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
  );
}
