/**
 * app/components/CartItems.tsx
 *
 * Renders the list of items in the shopping cart inside a styled card,
 * with animated entry/exit for both the overall card and each line item.
 * Allows quantity updates, item removal, and clearing the entire cart.
 *
 * Dependencies:
 *  - Framer Motion for animations
 *  - lucide-react for icons
 *  - Next/Image for optimized images
 *  - shadcn/ui Button, Badge, Card components
 *  - Sonner for toast notifications
 */

"use client";

import React, { memo } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

/**
 * Variants for animating the cart container Card
 */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 500 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

/**
 * Variants for animating each line item
 */
const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05, duration: 0.3 } }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  removed: { opacity: 0, x: -100, height: 0, marginTop: 0, marginBottom: 0, transition: {
      height: { delay: 0.1 }, marginTop: { delay: 0.1 }, marginBottom: { delay: 0.1 }
    }
  },
};

/**
 * A single sale record.
 */
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  keyIngredients?: string[];
}

/**
 * Props for the CartItems list component.
 */
interface CartItemsProps {
  cartItems: CartItem[];
  removingItemId: string | null;
  handleRemoveItem: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

/**
 * Memoized component for one line in the cart list.
 *
 * @param {object} props
 * @param {CartItem} props.item           — the cart item data
 * @param {number} props.index            — index for staggered animation
 * @param {string|null} props.removingItemId — if matches item._id, triggers removed exit
 * @param {(string)=>void} props.handleRemoveItem — callback to remove the item
 * @param {(string,number)=>void} props.updateCartItemQuantity — callback to update qty
 */
const CartItemComponent = memo(({
  item, index, removingItemId, handleRemoveItem, updateCartItemQuantity
}: {
  item: CartItem;
  index: number;
  removingItemId: string | null;
  handleRemoveItem: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
}) => (
  <motion.div
    key={item._id}
    custom={index}
    variants={listItemVariants}
    initial="hidden"
    animate="visible"
    exit={removingItemId === item._id ? "removed" : "exit"}
    className="group flex gap-4 items-start p-4 rounded-xl hover:bg-muted/30 transition-colors"
  >
    <motion.div whileHover={{ scale: 1.05 }} className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted shadow-sm">
      {item.image && (
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform group-hover:scale-110 duration-500"
          loading="lazy"
          sizes="96px"
        />
      )}
    </motion.div>

    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{item.name}</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRemoveItem(item._id)}
          className="text-muted-foreground hover:text-destructive transition-colors h-8 w-8 flex items-center justify-center rounded-full hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <div className="flex items-center gap-2 bg-background shadow-sm rounded-full">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => {
              if (item.quantity > 1) updateCartItemQuantity(item._id, item.quantity - 1);
              else handleRemoveItem(item._id);
            }}
          >
            <Minus className="h-3 w-3" />
          </motion.button>
          <span className="font-medium w-6 text-center">{item.quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </motion.button>
        </div>
        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
      </div>

      {item.keyIngredients && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-1 mt-2">
          {item.keyIngredients.map((ingredient, idx) => (
            <Badge variant="outline" key={idx} className="text-xs">
              {ingredient}
            </Badge>
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
));
CartItemComponent.displayName = "CartItemComponent";

/**
 * CartItems
 *
 * @param {CartItemsProps} props
 * @returns {JSX.Element|null} A card containing all cart items, or null if empty.
 */
const CartItems: React.FC<CartItemsProps> = ({
  cartItems,
  removingItemId,
  handleRemoveItem,
  updateCartItemQuantity,
  clearCart
}) => {
  if (!cartItems || cartItems.length === 0) return null;

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" transition={{ delay: 0.1 }}>
      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/70">
        <CardHeader className="bg-background/40 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Items
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <AnimatePresence>
            {cartItems.map((item, i) => (
              <CartItemComponent
                key={item._id}
                item={item}
                index={i}
                removingItemId={removingItemId}
                handleRemoveItem={handleRemoveItem}
                updateCartItemQuantity={updateCartItemQuantity}
              />
            ))}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 bg-muted/10">
          <motion.div whileHover={{ x: -3 }}>
            <Button variant="ghost" asChild className="group gap-2">
              <Link href="/menu" className="flex items-center">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
                Continue Shopping
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                if (confirm("Are you sure you want to clear your cart?")) {
                  clearCart();
                  toast("Cart cleared", { description: "All items have been removed" });
                }
              }}
            >
              Clear Cart
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default memo(CartItems);
