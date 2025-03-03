"use client";
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate estimated tax (example: 8%)
  const tax = subtotal * 0.08;
  
  // Calculate total
  const total = subtotal + tax;

  // Handle checkout
  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate processing - you would replace this with actual checkout logic
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      // Redirect or show success message
    }, 2000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center md:text-left">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <ShoppingBag size={64} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/menu" className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <motion.div 
              className="space-y-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h2 className="font-semibold text-xl mb-1">{item.name}</h2>
                      <p className="text-gray-700 mb-2">${item.price.toFixed(2)}</p>
                      
                      {/* Any customizations or special instructions could go here */}
                      {item.specialInstructions && (
                        <p className="text-gray-500 text-sm mb-2">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => updateCartItemQuantity(item._id, Math.max(1, item.quantity - 1))}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Item Total and Remove Button */}
                    <div className="flex flex-col items-end space-y-2 min-w-24">
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors flex items-center"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 size={16} className="mr-1" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="flex justify-between items-center mt-8">
              <Link href="/menu" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors">
                <ArrowLeft size={16} className="mr-1" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-medium text-white 
                  ${isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 transition-colors'
                  }`}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>Free delivery for orders over $35.</p>
                <p className="mt-2">Estimated delivery time: 30-45 minutes</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}