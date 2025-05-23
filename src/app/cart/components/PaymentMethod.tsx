/**
 * app/components/PaymentMethod.tsx
 *
 * A dropdown (`Select`) that lets the user choose the payment method
 * on the checkout page.
 *
 * Currently supports “Credit/Debit Card” and “PayPal”.  Calls the
 * `setPaymentMethod` callback whenever the selection changes.
 *
 * Visuals:
 *   • Uses shadcn/ui Select + Label  
 *   • lucide-react icons for each item
 */

"use client";

import React, { memo } from "react";
import { CreditCard, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/**
 * Props for `<PaymentMethod />`.
 *
 * @property {string} paymentMethod
 *   Current selected method (e.g., `"card"` or `"paypal"`).
 * @property {(method: string) => void} setPaymentMethod
 *   Parent callback called with the new method on change.
 */
interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

/**
 * PaymentMethod
 *
 * @param {PaymentMethodProps} props
 * @returns {JSX.Element}
 */
const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => (
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

export default memo(PaymentMethod);
