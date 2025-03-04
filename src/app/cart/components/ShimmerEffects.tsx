"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerEffectProps {
  className?: string;
}

// Basic shimmer loading effect component
export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ className }) => (
  <div
    className={cn(
      "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] rounded",
      className
    )}
  />
);

// Cart item shimmer placeholder
export const CartItemShimmer: React.FC = () => (
  <div className="flex gap-4 items-start p-4">
    <ShimmerEffect className="h-24 w-24 rounded-lg" />
    <div className="flex-1 space-y-3">
      <ShimmerEffect className="h-6 w-3/4" />
      <div className="flex justify-between items-center">
        <ShimmerEffect className="h-8 w-24 rounded-full" />
        <ShimmerEffect className="h-6 w-16" />
      </div>
      <div className="flex gap-1">
        <ShimmerEffect className="h-5 w-16 rounded-full" />
        <ShimmerEffect className="h-5 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

// Order summary shimmer placeholder
export const OrderSummaryShimmer: React.FC = () => (
  <div className="space-y-4">
    <ShimmerEffect className="h-8 w-full" />
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <ShimmerEffect className="h-4 w-24" />
        <ShimmerEffect className="h-4 w-16" />
      </div>
      <div className="flex justify-between items-center">
        <ShimmerEffect className="h-4 w-20" />
        <ShimmerEffect className="h-4 w-12" />
      </div>
      <div className="flex justify-between items-center">
        <ShimmerEffect className="h-4 w-28" />
        <ShimmerEffect className="h-4 w-14" />
      </div>
      <ShimmerEffect className="h-px w-full my-3" />
      <div className="flex justify-between items-center">
        <ShimmerEffect className="h-6 w-16" />
        <ShimmerEffect className="h-6 w-20" />
      </div>
    </div>
    <ShimmerEffect className="h-10 w-full rounded" />
    <ShimmerEffect className="h-12 w-full rounded" />
  </div>
);

// Recommendation card shimmer
export const RecommendationShimmer: React.FC = () => (
  <div className="rounded-lg overflow-hidden border border-gray-200">
    <ShimmerEffect className="h-40 w-full" />
    <div className="p-4 space-y-2">
      <ShimmerEffect className="h-5 w-3/4" />
      <div className="flex justify-between items-center">
        <ShimmerEffect className="h-4 w-16" />
        <ShimmerEffect className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </div>
);

// Page loading shimmer
export const PageLoadingShimmer: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
    <div className="space-y-6">
      <ShimmerEffect className="h-[150px] w-full" />
      <ShimmerEffect className="h-[300px] w-full" />
      <ShimmerEffect className="h-[200px] w-full" />
    </div>
    <div className="space-y-6">
      <ShimmerEffect className="h-[400px] w-full" />
      <ShimmerEffect className="h-[150px] w-full" />
    </div>
  </div>
);

export default {
  ShimmerEffect,
  CartItemShimmer,
  OrderSummaryShimmer,
  RecommendationShimmer,
  PageLoadingShimmer
};