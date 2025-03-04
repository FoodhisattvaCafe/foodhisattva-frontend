"use client";

import React, { memo } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { listItemVariants } from "../utils/animations";

// Define CartItem interface
interface CartItemProps {
  item: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    keyIngredients?: string[];
  };
  index: number;
  removingItemId: string | null;
  handleRemoveItem: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  index,
  removingItemId,
  handleRemoveItem,
  updateCartItemQuantity
}) => {
  return (
    <motion.div
      custom={index}
      variants={listItemVariants}
      initial="hidden"
      animate="visible"
      exit={removingItemId === item._id ? "removed" : "exit"}
      className="group flex gap-4 items-start p-4 rounded-xl hover:bg-muted/30 transition-colors"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted shadow-sm"
      >
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
                if (item.quantity > 1) {
                  updateCartItemQuantity(item._id, item.quantity - 1);
                } else {
                  handleRemoveItem(item._id);
                }
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
          <span className="font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        {item.keyIngredients && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-1 mt-2"
          >
            {item.keyIngredients.map((ingredient, idx) => (
              <Badge variant="outline" key={idx} className="text-xs">
                {ingredient}
              </Badge>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(CartItem);