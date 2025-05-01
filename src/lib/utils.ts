import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @function cn
 * @description
 * Utility function to conditionally merge Tailwind CSS class names.
 * Uses `clsx` to conditionally combine class names and `tailwind-merge` to remove conflicts.
 *
 * @param {...ClassValue[]} inputs - Array of class values to be merged.
 * @returns {string} A single string of valid, merged class names.
 *
 * @example
 * const buttonClass = cn("btn", isPrimary && "btn-primary", "text-lg");
 * // Output: "btn btn-primary text-lg" (depending on condition)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
