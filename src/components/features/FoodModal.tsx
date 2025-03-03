"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext"; // Import the cart context

// MenuItem Interface (Ensures Type Safety)
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

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: MenuItem | null;
}

const FoodModal: React.FC<FoodModalProps> = ({ isOpen, onClose, menuItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { addToCart } = useCart(); // Hook to access cart context

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSpecialInstructions("");
    }
  }, [isOpen, menuItem]);

  // Format dietary tags for display
  const formatDietaryTag = (tag: string) => {
    const tagMap: { [key: string]: string } = {
      gluten_free: "GF",
      soy_free: "SF",
      nut_free: "NF",
      spicy: "Spicy",
    };
    return tagMap[tag] || tag;
  };

  // Ensure menuItem exists
  if (!menuItem) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

        {/* Modal Content */}
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <Dialog.Close
              className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
              title="Close dialog"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Dialog.Close>

            {/* Food Image */}
            <div className="relative h-64 w-full">
              <Image
                src={menuItem.image || "/placeholder-food.jpg"}
                alt={menuItem.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <div className="flex justify-between items-end">
                  <Dialog.Title className="text-2xl font-bold text-white">
                    {menuItem.name}
                  </Dialog.Title>
                  <span className="text-2xl font-bold text-white">
                    ${menuItem.price.toFixed(2)}
                  </span>
                </div>

                {/* Dietary Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {menuItem.dietaryTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded bg-gray-700 text-white"
                    >
                      {formatDietaryTag(tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 16rem)" }}>
              {/* Description */}
              <Dialog.Description className="text-gray-600 dark:text-gray-300 mb-4">
                {menuItem.description}
              </Dialog.Description>

              {/* Key Ingredients */}
              {menuItem.keyIngredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                    Key Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {menuItem.keyIngredients.map((ingredient, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer with Add to Cart */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 dark:text-gray-400">Total</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${(menuItem.price * quantity).toFixed(2)}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                className="w-full py-3 px-6 rounded-full bg-accent-primary hover:bg-accent-dark text-white font-medium transition-colors flex items-center justify-center space-x-2"
                onClick={() => {
                  if (quantity > 0) {
                    addToCart({ ...menuItem, quantity });
                    onClose(); // Close modal after adding
                  }
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FoodModal;
