/**
 * app/components/OrderDetails.tsx
 *
 * Displays a small summary card showing:
 *  • Estimated delivery or pickup time  
 *  • Delivery address (only when the option is “delivery”)  
 *
 * Uses shadcn/ui `Card`, Lucide icons, and Framer-Motion for fade / slide-in.
 */

"use client";

import React, { memo } from "react";
import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cardVariants } from "../utils/animations";

/**
 * Props for the OrderDetails component.
 *
 * @property {string} deliveryOption  — `"delivery"` or `"pickup"`.
 * @property {string} [deliveryTime]  — ETA text. Default `"30–45 min"`.
 * @property {string} [deliveryAddress] — Address to show when delivery is selected.
 */
interface OrderDetailsProps {
  deliveryTime?: string;
  deliveryOption: "delivery" | "pickup";
  deliveryAddress?: string;
}

/**
 * OrderDetails
 *
 * Renders an animated card containing ETA and, if applicable,
 * the delivery address.
 *
 * @param {OrderDetailsProps} props
 * @returns {JSX.Element}
 */
const OrderDetails: React.FC<OrderDetailsProps> = ({
  deliveryTime = "30–45 min",
  deliveryOption,
  deliveryAddress = "123 Main St, Anytown, USA"
}) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{ delay: 0.4 }}
  >
    <Card className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm bg-white/70">
      <CardContent className="p-4 space-y-4">
        {/* ETA Row */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              Estimated {deliveryOption}
            </p>
            <p className="font-medium text-lg">{deliveryTime}</p>
          </div>
        </div>

        {/* Address Row (delivery only) */}
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

export default memo(OrderDetails);
