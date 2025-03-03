"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientClassName?: string;
}

export const BackgroundGradient = ({
  className,
  gradientClassName,
  children,
  ...props
}: BackgroundGradientProps) => {
  return (
    <div
      className={cn(
        "relative p-[0.15rem] bg-white rounded-xl overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 blur-sm transition duration-500",
          gradientClassName || "bg-gradient-to-r from-accent-primary via-accent-light to-accent-dark"
        )}
      />
      <div className="relative">{children}</div>
    </div>
  );
};