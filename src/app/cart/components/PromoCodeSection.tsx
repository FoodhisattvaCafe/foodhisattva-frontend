"use client";

import React, { memo } from "react";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PromoCodeSectionProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  handleApplyPromo: () => void;
}

const PromoCodeSection: React.FC<PromoCodeSectionProps> = ({
  promoCode,
  setPromoCode,
  handleApplyPromo,
}) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="promo">Apply a promotion</Label>
      
      <div className="flex gap-2">
        <Input
          id="promo"
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="transition-all focus-within:shadow-md"
        />
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleApplyPromo} 
            variant="secondary" 
            className="shadow-sm hover:shadow-md"
          >
            Apply
          </Button>
        </motion.div>
      </div>
      
      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Gift className="h-3 w-3" />
        Try "WELCOME20" for 20% off
      </p>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(PromoCodeSection);