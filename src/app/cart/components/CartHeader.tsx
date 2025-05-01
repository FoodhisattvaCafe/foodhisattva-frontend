/**
 * app/components/CartHeader.tsx
 *
 * A header component for the shopping cart page.  
 * Displays a back button to the menu, the page title, and
 * a badge showing the current number of items in the cart.
 *
 * Uses Framer Motion for subtle entry and hover animations,
 * lucide-react for icons, and shadcn/ui Button and Badge components.
 */

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

/**
 * Props for the CartHeader component.
 *
 * @property {number} itemCount - The total number of items in the cart.
 */
interface CartHeaderProps {
  itemCount: number;
}

/**
 * CartHeader
 *
 * Renders the cart page header with:
 *  - A back-arrow button to navigate to `/menu`
 *  - An animated title “Your Cart”
 *  - An animated badge showing itemCount
 *
 * @param {CartHeaderProps} props
 * @param {number} props.itemCount — Number of items currently in the cart.
 * @returns {JSX.Element} The rendered header UI.
 */
const CartHeader: React.FC<CartHeaderProps> = ({ itemCount }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link href="/menu">
        <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </motion.div>
      </Link>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-extrabold tracking-tight"
      >
        Your Cart
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <Badge variant="secondary" className="ml-2">
          {itemCount} items
        </Badge>
      </motion.div>
    </div>
  );
};

export default CartHeader;
