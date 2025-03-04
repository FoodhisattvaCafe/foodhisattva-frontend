"use client";

import React, { memo } from "react";
import { CreditCard, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  setPaymentMethod
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="payment">Payment Method</Label>
      <Select value={paymentMethod} onValueChange={setPaymentMethod}>
        <SelectTrigger id="payment" className="transition-all focus:shadow-md">
          <SelectValue placeholder="Select payment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="card">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Credit/Debit Card
            </div>
          </SelectItem>
          <SelectItem value="paypal">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              PayPal
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(PaymentMethod);