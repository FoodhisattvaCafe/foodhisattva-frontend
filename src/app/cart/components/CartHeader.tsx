"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CartHeaderProps {
  itemCount: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Link href="/menu">
        <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.9 }}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </motion.div>
      </Link>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-extrabold tracking-tight"
      >
        Your Cart
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <Badge variant="secondary" className="ml-2">
          {itemCount} items
        </Badge>
      </motion.div>
    </div>
  );
};

export default CartHeader;