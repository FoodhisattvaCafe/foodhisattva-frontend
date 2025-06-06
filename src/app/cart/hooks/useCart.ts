import { useState, useCallback, useMemo, useEffect } from 'react';
import { useCart as useGlobalCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

/**
 * Represents an individual item in the cart.
 * @typedef {Object} CartItem
 * @property {string} _id - Unique identifier for the item.
 * @property {string} name - Name of the item.
 * @property {number} price - Price of a single item.
 * @property {number} quantity - Quantity of this item in the cart.
 * @property {string} [image] - Optional image URL.
 * @property {string[]} [keyIngredients] - Optional list of ingredients.
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
 * Return structure for the useCart hook.
 * @typedef {Object} UseCartReturn
 */
interface UseCartReturn {
  cartItems: CartItem[];
  isLoading: boolean;
  removingItemId: string | null;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoDiscount: number;
  handleApplyPromo: () => void;
  handleRemoveItem: (id: string) => void;
  handleClearCart: () => void;
  handleQuantityChange: (id: string, quantity: number) => void;
  isProcessing: boolean;
  handleCheckout: () => void;
}

/**
 * Custom hook to manage shopping cart logic including:
 * - Cart state and calculations
 * - Promo code application
 * - Delivery/payment options
 * - Order processing and UI interaction
 *
 * @param {string} [initialDeliveryOption='delivery'] - Default delivery method
 * @returns {UseCartReturn}
 */
export const useCart = (initialDeliveryOption = 'delivery'): UseCartReturn => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart } = useGlobalCart();

  const [isLoading, setIsLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState(initialDeliveryOption);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated loading for smooth transitions
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /** Calculate subtotal */
  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  /** Calculate tax */
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);

  /** Calculate delivery fee (free if subtotal >= $35 or it's a pickup) */
  const deliveryFee = useMemo(
    () => (deliveryOption === 'delivery' && subtotal < 35 ? 4.99 : 0),
    [deliveryOption, subtotal]
  );

  /** Calculate total (subtotal + tax + delivery - promo discount) */
  const total = useMemo(
    () => subtotal + tax + deliveryFee - promoDiscount,
    [subtotal, tax, deliveryFee, promoDiscount]
  );

  /** Total number of items in the cart */
  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  /**
   * Remove item from cart with animation.
   * @param {string} itemId - ID of the item to remove
   */
  const handleRemoveItem = useCallback((itemId: string) => {
    setRemovingItemId(itemId);
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItemId(null);
      toast("Item removed from cart", {
        description: "The item has been removed from your order",
      });
    }, 300);
  }, [removeFromCart]);

  /**
   * Clear the entire cart after confirmation.
   */
  const handleClearCart = useCallback(() => {
    if (cartItems.length > 0 && confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast("Cart cleared", { description: "All items have been removed from your cart" });
    }
  }, [cartItems.length, clearCart]);

  /**
   * Update item quantity in cart, or remove if zero.
   * @param {string} itemId - ID of item to update
   * @param {number} quantity - New quantity
   */
  const handleQuantityChange = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(itemId);
    } else if (quantity <= 99) {
      updateCartItemQuantity(itemId, quantity);
    } else {
      toast.error("Maximum quantity exceeded", {
        description: "Please contact us for large orders"
      });
    }
  }, [handleRemoveItem, updateCartItemQuantity]);

  /**
   * Apply promo code and calculate discount.
   */
  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) {
      toast("Please enter a promo code", {
        description: "Enter a valid promo code to get a discount",
      });
      return;
    }

    setPromoDiscount(0);

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
      toast.error("Invalid promo code", {
        description: "Try 'WELCOME20' for 20% off your order.",
      });
    }
  }, [promoCode, subtotal]);

  /**
   * Finalize checkout process (with simulated delay).
   */
  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        description: "Add some items before checking out",
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully!", {
        description: "You'll receive a confirmation email shortly",
      });
    }, 2000);
  }, [cartItems.length]);

  return {
    cartItems,
    isLoading,
    removingItemId,
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    deliveryOption,
    setDeliveryOption,
    paymentMethod,
    setPaymentMethod,
    promoCode,
    setPromoCode,
    promoDiscount,
    handleApplyPromo,
    handleRemoveItem,
    handleClearCart,
    handleQuantityChange,
    isProcessing,
    handleCheckout,
  };
};

export default useCart;
