"use client";

import React, { memo } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface OrderSuccessProps {
  showOrderSuccess: boolean;
  setShowOrderSuccess: (show: boolean) => void;
  handleOrderConfirmed: () => void;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({
  showOrderSuccess,
  setShowOrderSuccess,
  handleOrderConfirmed
}) => {
  // Generate random order number for demo purposes
  const orderNumber = `FH-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Current date and time for order placed timestamp
  const orderDate = new Date().toLocaleDateString();
  const orderTime = new Date().toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });

  return (
    <Dialog open={showOrderSuccess} onOpenChange={setShowOrderSuccess}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="flex flex-col items-center text-center"
        >
          {/* Success Icon Header */}
          <div className="bg-primary/10 w-full py-6">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="h-20 w-20 text-primary mx-auto" />
            </motion.div>
          </div>

          {/* Success Message Content */}
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
            
            {/* Action Buttons */}
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

// Use memo to prevent unnecessary re-renders
export default memo(OrderSuccess);