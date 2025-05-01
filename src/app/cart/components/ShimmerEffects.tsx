/**
 * ShimmerEffects.tsx
 * 
 * A set of reusable React components to display loading shimmer effects
 * for various parts of the UI, such as cart items, recommendations,
 * order summary, and full page loaders.
 * 
 * @module ShimmerEffects
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props for the ShimmerEffect component.
 * @typedef {Object} ShimmerEffectProps
 * @property {string} [className] - Optional Tailwind classes for styling.
 */
interface ShimmerEffectProps {
  className?: string;
}

/**
 * Renders a base shimmer animation block.
 *
 * @param {ShimmerEffectProps} props - The props for styling.
 * @returns {JSX.Element}
 */
export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ className }) => (
  <div
    className={cn(
      "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] rounded",
      className
    )}
  />
);

/**
 * Shimmer placeholder for a cart item while loading.
 * @returns {JSX.Element}
 */
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

/**
 * Shimmer placeholder for order summary breakdown while loading.
 * @returns {JSX.Element}
 */
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

/**
 * Shimmer card for product recommendations.
 * @returns {JSX.Element}
 */
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

/**
 * Full-page shimmer layout used while the entire screen is loading.
 * @returns {JSX.Element}
 */
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

/**
 * Default export as grouped object (optional).
 */
export default {
  ShimmerEffect,
  CartItemShimmer,
  OrderSummaryShimmer,
  RecommendationShimmer,
  PageLoadingShimmer
};
