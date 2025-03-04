"use client";

import React, { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { pageTransitionVariants } from "@/app/cart/utils/animations"; 
// Import components
import CartHeader from "@/app/cart/components/CartHeader";
import DeliveryOptions from "@/app/cart/components/DeliveryOptions";
import CartItems from "@/app/cart/components/CartItems";
import EmptyCart from "@/app/cart/components/EmptyCart";
import OrderSummary from "@/app/cart/components/OrderSummary";
import OrderDetails from "@/app/cart/components/OrderDetails";
import Recommendations from "@/app/cart/components/Recommendations";
import OrderSuccess from "@/app/cart/components/OrderSuccess";
import { PageLoadingShimmer } from "@/app/cart/components/ShimmerEffects";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  
  // State variables
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [deliveryTime] = useState("30-45 min");
  const [deliveryAddress] = useState("123 Main St, Anytown, USA");
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  // Sample recommendations data
  const [recommendations, setRecommendations] = useState([
    { _id: "rec1", name: "Spring Rolls", price: 6.95, image: "/images/food-1.png" },
    { _id: "rec2", name: "Miso Soup", price: 4.95, image: "/images/food-2.png" },
    { _id: "rec3", name: "Edamame", price: 5.95, image: "/images/food-3.png" },
  ]);

  // Simulate page loading and recommendations loading
  // This is just for demo purposes - would be replaced with real data fetching
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800);
    const recTimer = setTimeout(() => setLoadingRecommendations(false), 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(recTimer);
    };
  }, []);

  // Memoized computations for performance
  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  
  const deliveryFee = useMemo(
    () => (deliveryOption === "delivery" && subtotal < 35 ? 4.99 : 0),
    [deliveryOption, subtotal]
  );
  
  const total = useMemo(
    () => subtotal + tax + deliveryFee - promoDiscount,
    [subtotal, tax, deliveryFee, promoDiscount]
  );

  // Calculate total number of items in cart
  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // Promo code handler
  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) {
      toast("Please enter a promo code", {
        description: "Enter a valid promo code to get a discount",
        action: { label: "Dismiss", onClick: () => {} },
      });
      return;
    }

    if (promoCode.toUpperCase() === "WELCOME20") {
      const discount = subtotal * 0.2;
      setPromoDiscount(discount);
      toast.success("Promo applied successfully!", {
        description: `You saved $${discount.toFixed(2)} with this code.`,
        action: {
          label: "Remove",
          onClick: () => {
            setPromoCode("");
            setPromoDiscount(0);
          },
        },
      });
    } else {
      setPromoDiscount(0);
      toast.error("Invalid promo code", {
        description: "Try 'WELCOME20' for 20% off your order.",
      });
    }
  }, [promoCode, subtotal]);

  // Remove item with a slight delay to allow animation
  const handleRemoveItem = useCallback(
    (itemId: string) => {
      setRemovingItemId(itemId);
      setTimeout(() => {
        removeFromCart(itemId);
        setRemovingItemId(null);
        toast("Item removed from cart", {
          description: "The item has been removed from your order",
        });
      }, 300);
    },
    [removeFromCart]
  );

  // Checkout process simulation
  const handleCheckout = useCallback(() => {
    setIsProcessing(true);
    setTimeout(() => {
      setShowOrderSuccess(true);
      setIsProcessing(false);
    }, 2000);
  }, []);

  // Order confirmation handler
  const handleOrderConfirmed = useCallback(() => {
    clearCart();
    setShowOrderSuccess(false);
    toast.success("Thank you for your order!", {
      description: "You'll receive updates on your order status shortly.",
      duration: 5000,
    });
  }, [clearCart]);

  // Placeholder for adding an item to the cart
  const addItemToCart = useCallback(
    (item: { _id: string; name: string; price: number; image: string }) => {
      toast.success(`${item.name} added to cart!`, {
        description: "Item has been added to your order",
      });
      // In a real implementation, this would add the item to the cart
      // updateCartItemQuantity or add new item
    },
    []
  );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-8"
      {...pageTransitionVariants}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Cart Header with back button and cart count */}
        <CartHeader itemCount={itemCount} />

        {isPageLoading ? (
          // Loading state
          <PageLoadingShimmer />
        ) : cartItems.length === 0 ? (
          // Empty cart state
          <EmptyCart />
        ) : (
          // Cart with items
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Delivery Options */}
              <DeliveryOptions 
                deliveryOption={deliveryOption} 
                setDeliveryOption={setDeliveryOption} 
              />

              {/* Cart Items */}
              <CartItems
                cartItems={cartItems}
                removingItemId={removingItemId}
                handleRemoveItem={handleRemoveItem}
                updateCartItemQuantity={updateCartItemQuantity}
                clearCart={clearCart}
              />

              {/* Recommendations */}
              <Recommendations
                recommendations={recommendations}
                addItemToCart={addItemToCart}
                loadingRecommendations={loadingRecommendations}
              />
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <OrderSummary
                subtotal={subtotal}
                tax={tax}
                deliveryFee={deliveryFee}
                promoDiscount={promoDiscount}
                total={total}
                deliveryOption={deliveryOption}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                handleApplyPromo={handleApplyPromo}
                isProcessing={isProcessing}
                handleCheckout={handleCheckout}
                cartItemsCount={cartItems.length}
              />

              {/* Order Details */}
              <OrderDetails
                deliveryTime={deliveryTime}
                deliveryOption={deliveryOption}
                deliveryAddress={deliveryAddress}
              />
            </div>
          </div>
        )}
      </div>

      {/* Order Success Dialog */}
      <OrderSuccess
        showOrderSuccess={showOrderSuccess}
        setShowOrderSuccess={setShowOrderSuccess}
        handleOrderConfirmed={handleOrderConfirmed}
      />
    </motion.div>
  );
};

export default CartPage;