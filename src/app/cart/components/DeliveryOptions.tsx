"use client";

import React from "react";
import { Home, Store, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 500 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

interface DeliveryOptionsProps {
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  deliveryOption,
  setDeliveryOption,
}) => {
  const handleDeliveryChange = (value: string) => {
    setDeliveryOption(value);
    toast(`Changed to ${value === "delivery" ? "delivery" : "pickup"}`);
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit">
      <Card className="overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/70">
        <CardHeader className="bg-background/40 backdrop-blur-sm border-b border-gray-200">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Delivery Method
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <RadioGroup
            value={deliveryOption}
            onValueChange={handleDeliveryChange}
            className="grid grid-cols-2 gap-4"
          >
            <Label className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary/5 cursor-pointer">
              <RadioGroupItem value="delivery" className="sr-only" />
              <div className="flex flex-col items-center gap-4 p-4 border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  <span className="font-medium">Delivery</span>
                </motion.div>
                <p className="text-sm text-muted-foreground text-center">
                  Get your order delivered to your doorstep
                </p>
              </div>
            </Label>

            <Label className="[&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary/5 cursor-pointer">
              <RadioGroupItem value="pickup" className="sr-only" />
              <div className="flex flex-col items-center gap-4 p-4 border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                <motion.div whileHover={{ y: -2 }} className="flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  <span className="font-medium">Pickup</span>
                </motion.div>
                <p className="text-sm text-muted-foreground text-center">
                  Pick up your order at our nearest location
                </p>
              </div>
            </Label>
          </RadioGroup>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DeliveryOptions;