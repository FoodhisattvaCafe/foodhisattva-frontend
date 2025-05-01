/**
 * app/components/OrderSummary.tsx
 *
 * Checkout sidebar summarizing the current order:
 *   – Breakdown (subtotal · tax · delivery/pick-up fee · promo)  
 *   – Promo-code entry / Delivery-details tabs  
 *   – Payment-method radio buttons  
 *   – “Pay $xx.xx” button with loading state  
 *
 * Animated with Framer-Motion; uses shadcn/ui Card, Tabs, Button, etc.
 */

"use client";

import React from "react";
import { CheckCircle, CreditCard, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cardVariants } from "../utils/animations";
import PromoCodeSection from "./PromoCodeSection";
import DeliveryDetails from "./DeliveryDetails";
import PaymentMethod from "./PaymentMethod";

/**
 * Props accepted by the OrderSummary component.
 */
interface OrderSummaryProps {
  /** Cart subtotal before tax & fees. */
  subtotal: number;
  /** Calculated tax amount. */
  tax: number;
  /** Delivery or pick-up fee (0 means Free). */
  deliveryFee: number;
  /** Promo discount in dollars. */
  promoDiscount: number;
  /** Final total after everything. */
  total: number;
  /** `"delivery"` or `"pickup"` – affects labels & details tab. */
  deliveryOption: "delivery" | "pickup";
  /** Current payment method string for the PaymentMethod sub-component. */
  paymentMethod: string;
  /** Setter passed down to PaymentMethod. */
  setPaymentMethod: (method: string) => void;
  /** Current promo-code string. */
  promoCode: string;
  /** Setter for promoCode input. */
  setPromoCode: (code: string) => void;
  /** Apply-promo callback (validates & sets discount). */
  handleApplyPromo: () => void;
  /** Flag to show spinner on the Pay button. */
  isProcessing: boolean;
  /** Handler invoked on “Pay” click. */
  handleCheckout: () => void;
  /** Total number of items in cart (disables Pay when 0). */
  cartItemsCount: number;
}

/**
 * OrderSummary
 *
 * Sticky card that animates in, shows a cost breakdown,
 * promo/delivery tabs, payment selection, and secure Pay button.
 */
const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  tax,
  deliveryFee,
  promoDiscount,
  total,
  deliveryOption,
  paymentMethod,
  setPaymentMethod,
  promoCode,
  setPromoCode,
  handleApplyPromo,
  isProcessing,
  handleCheckout,
  cartItemsCount,
}) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{ delay: 0.3 }}
  >
    <Card className="sticky top-20 border border-gray-200 shadow-lg backdrop-blur-sm bg-white/70">
      <CardHeader className="bg-background/50 backdrop-blur-sm border-b border-gray-200">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* --- Cost breakdown -------------------------------------------- */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {deliveryOption === "delivery" ? "Delivery" : "Pickup"}
            </span>
            <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
              {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : "Free"}
            </span>
          </div>

          {promoDiscount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between text-green-600"
            >
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                Promo Discount
              </span>
              <span>- ${promoDiscount.toFixed(2)}</span>
            </motion.div>
          )}

          <Separator className="my-3" />

          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <motion.span
              key={total}
              initial={{ scale: 1.2, color: "#22c55e" }}
              animate={{ scale: 1, color: "currentColor" }}
              transition={{ duration: 0.3 }}
            >
              ${total.toFixed(2)}
            </motion.span>
          </div>
        </div>

        {/* --- Tabs: Promo vs Delivery ----------------------------------- */}
        <Tabs defaultValue="promoCode" className="w-full">
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="promoCode">Promo Code</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Details</TabsTrigger>
          </TabsList>

          <TabsContent value="promoCode" className="space-y-3">
            <PromoCodeSection
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              handleApplyPromo={handleApplyPromo}
            />
          </TabsContent>

          <TabsContent value="delivery" className="space-y-3">
            <DeliveryDetails deliveryOption={deliveryOption} />
          </TabsContent>
        </Tabs>

        {/* --- Payment method & Pay -------------------------------------- */}
        <div className="space-y-4">
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="w-full h-12 text-lg shadow-md hover:shadow-lg transition-shadow bg-primary text-primary-foreground"
              onClick={handleCheckout}
              disabled={isProcessing || cartItemsCount === 0}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-background"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing…
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Pay ${total.toFixed(2)}
                </div>
              )}
            </Button>
          </motion.div>

          <div className="flex items-center justify-center text-xs text-muted-foreground gap-1">
            <ShieldCheck className="h-3 w-3" />
            <span>Secure checkout</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default OrderSummary;
