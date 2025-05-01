'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * @interface CartItem
 * @description
 * Represents a single item in the shopping cart.
 */
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

/**
 * @interface CartContextProps
 * @description
 * Structure for the cart context, including cart state and utility methods.
 */
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

/**
 * @constant CartContext
 * @description
 * React context that holds the cart state and utility functions.
 */
const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
});

/**
 * @function useCart
 * @description
 * React hook to access the cart context in components.
 * @returns {CartContextProps} The current cart context value.
 */
export function useCart() {
  return useContext(CartContext);
}

/**
 * @component CartProvider
 * @description
 * Provides the cart context to all child components.
 * Manages cart item state and operations like add, update, remove, and clear.
 *
 * @param {ReactNode} children - React children components.
 * @returns {JSX.Element} Cart context provider with children.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /**
   * Adds a new item to the cart or updates its quantity if it already exists.
   *
   * @param {CartItem} item - Item to be added.
   * @param {number} [quantity=1] - Quantity to add.
   */
  const addToCart = (item: CartItem, quantity = 1) => {
    if (quantity <= 0) return;

    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex((cartItem) => cartItem._id === item._id);

      if (existingItemIndex !== -1) {
        return prev.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity }];
    });
  };

  /**
   * Removes an item from the cart using its ID.
   *
   * @param {string} id - ID of the item to remove.
   */
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  /**
   * Updates the quantity of a specific cart item.
   * Removes the item if quantity is zero or negative.
   *
   * @param {string} id - ID of the item to update.
   * @param {number} quantity - New quantity for the item.
   */
  const updateCartItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Clears all items from the cart.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Calculates and returns the total price of all items in the cart.
   *
   * @returns {number} Total price.
   */
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Returns the total number of items in the cart.
   *
   * @returns {number} Total item count.
   */
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



 
