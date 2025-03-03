"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

/** Cart Item Interface */
export interface CartItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dietaryTags: string[];
  keyIngredients: string[];
  image?: string;
  quantity: number;
  specialInstructions?: string;
}

/** Cart context with add/remove/update functions */
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

/** Create context with default values */
const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
});

/** Hook to use cart context */
export function useCart() {
  return useContext(CartContext);
}

/** CartProvider Component */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /** Add item to cart or update quantity */
  const addToCart = (item: CartItem, quantity = 1) => {
    if (quantity <= 0) return; // Prevent adding 0 quantity items
    
    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex((cartItem) => cartItem._id === item._id);
      
      if (existingItemIndex !== -1) {
        // Update existing item quantity
        return prev.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      // Add new item
      return [...prev, { ...item, quantity }];
    });
  };

  /** Remove item from cart */
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  /** Update quantity of a specific cart item */
  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or negative, remove the item
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  /** Clear all items from cart */
  const clearCart = () => {
    setCartItems([]);
  };

  /** Calculate total price of all items in cart */
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /** Get total number of items in cart */
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}