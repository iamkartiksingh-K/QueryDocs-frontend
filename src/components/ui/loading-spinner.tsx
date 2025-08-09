"use client";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "blue" | "white" | "gray";
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  color = "blue" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const colorClasses = {
    blue: "text-blue-600",
    white: "text-white",
    gray: "text-gray-600"
  };

  return (
    <div
      className={cn(
        "animate-spin inline-block rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Gradient spinner variant
export function GradientSpinner({ 
  size = "md", 
  className 
}: Omit<LoadingSpinnerProps, "color">) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8", 
    xl: "w-12 h-12"
  };

  return (
    <div
      className={cn(
        "animate-spin inline-block rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-border",
        sizeClasses[size],
        className
      )}
      style={{
        background: "conic-gradient(from 0deg, #3B82F6, #8B5CF6, #3B82F6)",
        borderRadius: "50%",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)",
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), white 0)"
      }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Full screen loading overlay
export function LoadingOverlay({ 
  isVisible = true,
  message = "Loading...",
  backdrop = true 
}: {
  isVisible?: boolean;
  message?: string;
  backdrop?: boolean;
}) {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      backdrop && "bg-black/20 backdrop-blur-sm"
    )}>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-blue-200/50">
        <div className="text-center">
          <GradientSpinner size="lg" />
          <p className="mt-4 text-gray-700 font-medium animate-pulse">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}