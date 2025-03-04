'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '@/components/ui/skeleton';
import MenuItemCard from './MenuItemCard';
import EmptyMenuState from './EmptyMenuState';
import { MenuItem } from '../types/menu';

interface MenuGridProps {
  loading: boolean;
  filteredItems: MenuItem[];
  handleReset: () => void;
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuGrid({
  loading,
  filteredItems,
  handleReset,
  onSelectItem,
  onAddToCart,
}: MenuGridProps) {
  // Intersection Observer for animations
  const { ref: inViewRef } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
        {Array.from({ length: 6 }).map((_, idx: number) => (
          <Skeleton key={idx} className="h-64 rounded-lg" />
        ))}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return <EmptyMenuState onReset={handleReset} />;
  }

  return (
    <LayoutGroup>
      <AnimatePresence>
        <motion.div
          ref={inViewRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"
        >
          {filteredItems.map((item: MenuItem) => (
            <MenuItemCard
              key={item._id}
              item={item}
              onSelect={onSelectItem}
              onAddToCart={onAddToCart}
              loading={loading}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}