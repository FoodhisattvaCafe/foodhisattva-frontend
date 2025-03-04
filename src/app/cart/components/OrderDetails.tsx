"use client";

import React, { memo } from "react";
import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cardVariants } from "../utils/animations";

interface OrderDetailsProps {
  deliveryTime: string;
  deliveryOption: string;
  deliveryAddress?: string;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  deliveryTime = "30-45 min",
  deliveryOption,
  deliveryAddress = "123 Main St, Anytown, USA" // Default value if not provided
}) => {
  return (
    <motion.div 
      variants={cardVariants} 
      initial="hidden" 
      animate="visible" 
      exit="exit" 
      transition={{ delay: 0.4 }}
    >
      <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/70">
        <CardContent className="p-4 space-y-4">
          {/* Delivery Time */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated {deliveryOption}</p>
              <p className="font-medium text-lg">{deliveryTime}</p>
            </div>
          </div>
          
          {/* Delivery Address (only show if delivery is selected) */}
          {deliveryOption === "delivery" && (
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivering to</p>
                <p className="font-medium">{deliveryAddress}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(OrderDetails);