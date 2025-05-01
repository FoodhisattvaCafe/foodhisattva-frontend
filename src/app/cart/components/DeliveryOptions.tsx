/**
 * app/components/DeliveryOptions.tsx
 *
 * Radio-card selector that lets the user switch between
 * *Delivery* and *Pickup* on the checkout page.
 *
 * • When a selection changes it calls `setDeliveryOption`  
 *   (lifting state to the parent) and shows a toast.  
 * • Uses shadcn/ui `Card`, `RadioGroup`, `Label`, Lucide icons,
 *   Framer-Motion for subtle animations, and Sonner for toasts.
 */

"use client";

import React from "react";
import { Home, Store, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";

/** Motion variants for the outer Card drop-in animation. */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 500 } },
  exit:   { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

/**
 * Props for the DeliveryOptions component.
 *
 * @property {"delivery" | "pickup"} deliveryOption
 *    The currently selected option.
 * @property {(option: "delivery" | "pickup") => void} setDeliveryOption
 *    Callback invoked when the user changes the option.
 */
interface DeliveryOptionsProps {
  deliveryOption: "delivery" | "pickup";
  setDeliveryOption: (option: "delivery" | "pickup") => void;
}

/**
 * DeliveryOptions
 *
 * Renders two selectable cards (“Delivery” & “Pickup”) inside
 * a Card wrapper.  Highlights the selected card and triggers a
 * toast on change.
 */
const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  deliveryOption,
  setDeliveryOption,
}) => {
  /** Handle radio-group value change and show a toast. */
  const handleDeliveryChange = (value: "delivery" | "pickup") => {
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
            {/* Delivery card */}
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

            {/* Pickup card */}
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
