/**
 * PromoCodeSection Component
 * 
 * This component allows the user to enter a promotional code and apply it to 
 * the checkout process.
 * 
 * @component
 * @example
 * const [promoCode, setPromoCode] = useState("");
 * const handleApplyPromo = () => { console.log("Promo Applied"); };
 * <PromoCodeSection promoCode={promoCode} setPromoCode={setPromoCode} handleApplyPromo={handleApplyPromo} />
 * 
 * @param {object} props - The props for the PromoCodeSection component.
 * @param {string} props.promoCode - The current value of the promo code.
 * @param {function} props.setPromoCode - Function to update the promo code value.
 * @param {function} props.handleApplyPromo - Function to apply the promo code.
 * 
 * @returns {JSX.Element} The rendered component.
 */

"use client";

import React, { memo } from "react";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * Interface for the props of the PromoCodeSection component.
 * 
 * @typedef {Object} PromoCodeSectionProps
 * @property {string} promoCode - The current value of the promo code.
 * @property {function} setPromoCode - Function to set the promo code.
 * @property {function} handleApplyPromo - Function to apply the promo code.
 */

/**
 * PromoCodeSection Component
 * 
 * Displays an input field for entering a promo code and applies it when the "Apply" button is clicked.
 * 
 * @param {PromoCodeSectionProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
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
