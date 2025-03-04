import { useState, useCallback, useMemo, useEffect } from 'react';
import { useCart as useGlobalCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Define CartItem type
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  keyIngredients?: string[];
}

// Define return type for our hook
interface UseCartReturn {
  // Cart state
  cartItems: CartItem[];
  isLoading: boolean;
  removingItemId: string | null;
  
  // Cart calculations
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  
  // Delivery and payment methods
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  
  // Promo code functionality
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoDiscount: number;
  handleApplyPromo: () => void;
  
  // Cart actions
  handleRemoveItem: (id: string) => void;
  handleClearCart: () => void;
  handleQuantityChange: (id: string, quantity: number) => void;
  
  // Order processing
  isProcessing: boolean;
  handleCheckout: () => void;
}

/**
 * Enhanced cart hook that provides additional cart-specific functionality
 * beyond what's available in the global CartContext
 */
export const useCart = (initialDeliveryOption = 'delivery'): UseCartReturn => {
  // Get base cart functionality from global context
  const { 
    cartItems, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart 
  } = useGlobalCart();
  
  // Local state for cart page
  const [isLoading, setIsLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState(initialDeliveryOption);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  
  // Memoized cart calculations
  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );
  
  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  
  const deliveryFee = useMemo(
    () => (deliveryOption === 'delivery' && subtotal < 35 ? 4.99 : 0),
    [deliveryOption, subtotal]
  );
  
  const total = useMemo(
    () => subtotal + tax + deliveryFee - promoDiscount,
    [subtotal, tax, deliveryFee, promoDiscount]
  );
  
  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  
  // Handle removing items with animation
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
  
  // Handle clearing cart with confirmation
  const handleClearCart = useCallback(() => {
    if (cartItems.length > 0 && confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast("Cart cleared", { 
        description: "All items have been removed from your cart" 
      });
    }
  }, [cartItems.length, clearCart]);
  
  // Handle quantity change with validation
  const handleQuantityChange = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(itemId);
    } else if (quantity <= 99) { // Maximum reasonable quantity 
      updateCartItemQuantity(itemId, quantity);
    } else {
      toast.error("Maximum quantity exceeded", {
        description: "Please contact us for large orders"
      });
    }
  }, [handleRemoveItem, updateCartItemQuantity]);
  
  // Handle promo code application
  const handleApplyPromo = useCallback(() => {
    if (!promoCode.trim()) {
      toast("Please enter a promo code", {
        description: "Enter a valid promo code to get a discount",
      });
      return;
    }

    // Reset any existing discount first
    setPromoDiscount(0);
    
    // Check for valid promo codes
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
  
  // Handle checkout process
  const handleCheckout = useCallback(() => {
    // Validation
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        description: "Add some items before checking out",
      });
      return;
    }
    
    // Process checkout
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Here you would navigate to success page or show dialog
      toast.success("Order placed successfully!", {
        description: "You'll receive a confirmation email shortly",
      });
    }, 2000);
  }, [cartItems.length]);
  
  return {
    // Cart state
    cartItems,
    isLoading,
    removingItemId,
    
    // Cart calculations
    subtotal,
    tax,
    deliveryFee,
    total,
    itemCount,
    
    // Delivery and payment methods
    deliveryOption,
    setDeliveryOption,
    paymentMethod,
    setPaymentMethod,
    
    // Promo code functionality
    promoCode,
    setPromoCode,
    promoDiscount,
    handleApplyPromo,
    
    // Cart actions
    handleRemoveItem,
    handleClearCart,
    handleQuantityChange,
    
    // Order processing
    isProcessing,
    handleCheckout,
  };
};

export default useCart;