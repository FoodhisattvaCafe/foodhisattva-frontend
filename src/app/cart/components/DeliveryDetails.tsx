"use client";

import React, { memo } from "react";
import { MapPin, Store, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DeliveryDetailsProps {
  deliveryOption: string;
  deliveryAddress?: string;
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  deliveryOption,
  deliveryAddress = "123 Main St, Anytown, USA" // Default value if not provided
}) => {
  return (
    <div className="space-y-2">
      {deliveryOption === "delivery" ? (
        // Delivery Address Section
        <div className="space-y-2">
          <Label>Delivery Address</Label>
          <div className="flex items-start gap-2 p-3 border rounded-md hover:border-primary/50 hover:bg-muted/20 transition-colors">
            <MapPin className="h-4 w-4 mt-0.5 text-primary" />
            <span className="text-sm">{deliveryAddress}</span>
          </div>
          <Button variant="link" size="sm" className="h-8 px-0">
            Change address
          </Button>
        </div>
      ) : (
        // Pickup Location Section
        <div className="space-y-2">
          <Label>Pickup Location</Label>
          <div className="flex items-start gap-2 p-3 border rounded-md hover:border-primary/50 hover:bg-muted/20 transition-colors">
            <Store className="h-4 w-4 mt-0.5 text-primary" />
            <span className="text-sm">123 Restaurant St, Foodtown, USA</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3" />
            Ready for pickup in approximately 20-25 minutes
          </div>
        </div>
      )}
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(DeliveryDetails);