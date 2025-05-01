/**
 * app/components/OrderSuccess.tsx
 *
 * A modal dialog shown after a successful checkout.  Displays:
 *  • Animated success icon  
 *  • Random order number & timestamp (demo only)  
 *  • “Track Order” and “Continue Shopping” buttons  
 *
 * Uses shadcn/ui `Dialog` + `Button`, Lucide icon, and Framer-Motion for
 * entrance animations.  Parent component controls visibility via the
 * `showOrderSuccess` prop.
 */

"use client";

import React, { memo } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * Props for the OrderSuccess modal.
 *
 * @property {boolean} showOrderSuccess  — open/close state
 * @property {(show: boolean) => void} setShowOrderSuccess — toggler from parent
 * @property {() => void} handleOrderConfirmed — callback for both CTA buttons
 */
interface OrderSuccessProps {
  showOrderSuccess: boolean;
  setShowOrderSuccess: (show: boolean) => void;
  handleOrderConfirmed: () => void;
}

/**
 * OrderSuccess
 *
 * @param {OrderSuccessProps} props
 * @returns {JSX.Element} animated confirmation dialog
 */
const OrderSuccess: React.FC<OrderSuccessProps> = ({
  showOrderSuccess,
  setShowOrderSuccess,
  handleOrderConfirmed
}) => {
  /** Generate a fake order number for the demo UI. */
  const orderNumber = `FH-${Math.floor(100000 + Math.random() * 900000)}`;

  /** Format current datetime for display. */
  const orderDate  = new Date().toLocaleDateString();
  const orderTime  = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <Dialog open={showOrderSuccess} onOpenChange={setShowOrderSuccess}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="flex flex-col items-center text-center"
        >
          {/* Header icon */}
          <div className="bg-primary/10 w-full py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-20 w-20 text-primary mx-auto" />
            </motion.div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold"
            >
              Order Confirmed!
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-muted-foreground mb-2">
                Your order has been successfully placed
              </p>

              <div className="bg-muted/30 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium">Order #{orderNumber}</p>
                <p className="text-xs text-muted-foreground">
                  {orderDate} at {orderTime}
                </p>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full space-y-3"
            >
              <Button className="w-full" onClick={handleOrderConfirmed}>
                Track Order
              </Button>
              <Button variant="outline" className="w-full" onClick={handleOrderConfirmed}>
                Continue Shopping
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(OrderSuccess);
