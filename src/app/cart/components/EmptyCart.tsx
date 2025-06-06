/**
 * app/components/EmptyCart.tsx
 *
 * A friendly “empty cart” placeholder that encourages the user to explore
 * the menu when no items are in the shopping cart.
 *
 * Features
 * --------
 * • Animated shopping-bag illustration (Framer Motion).  
 * • Call-to-action button linking to `/menu`.  
 * • Uses shadcn/ui `Button` and lucide-react icons.
 */

"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cardVariants } from "../utils/animations";

/**
 * EmptyCart
 *
 * @returns {JSX.Element} A full-height flex container with an animated
 *   illustration, headline, descriptive text, and a “Browse Menu” button.
 */
const EmptyCart: React.FC = () => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="flex flex-col items-center justify-center min-h-[60vh] text-center"
  >
    {/* Animated icon & ring */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", damping: 15, delay: 0.2 }}
      className="relative w-64 h-64 mb-8"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-muted/40 rounded-full">
        <ShoppingBag className="h-24 w-24 text-muted-foreground" />
      </div>
      <svg className="animate-spin-slow absolute inset-0 h-full w-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1, 8"
          className="text-muted-foreground/30"
        />
      </svg>
    </motion.div>

    {/* Headline */}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-2xl font-semibold mb-4"
    >
      Your cart feels lonely
    </motion.h2>

    {/* Description */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-muted-foreground mb-8 max-w-md"
    >
      Let&apos;s fill it up with deliciousness! Explore our menu and discover your next
      favorite meal.
    </motion.p>

    {/* CTA button */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href="/menu">
        <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
          Browse Menu
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  </motion.div>
);

export default EmptyCart;
