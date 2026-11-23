import React from "react";

/**
 * Floral and botanical flourishes for romantic accents
 */
export const FloralCorner = ({ position = "top-left", className = "" }) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };

  return (
    <div
      className={`absolute pointer-events-none opacity-40 select-none z-0 ${positionClasses[position]} ${className}`}
      aria-hidden="true"
    >
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 text-[#e85d7b]"
      >
        <path
          d="M0 0C40 2 80 20 100 50C115 72 120 105 120 140"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          strokeOpacity="0.6"
        />
        {/* Soft botanical leaves */}
        <path
          d="M20 15C35 10 50 18 45 35C30 35 25 25 20 15Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path
          d="M50 35C65 25 80 35 75 50C60 52 52 42 50 35Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
        <path
          d="M75 60C92 50 105 65 98 80C82 82 76 70 75 60Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path
          d="M95 95C112 85 125 102 118 116C102 116 97 105 95 95Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
        {/* Delicate floral bud */}
        <circle cx="100" cy="50" r="4" fill="currentColor" fillOpacity="0.4" />
        <circle cx="120" cy="140" r="3" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </div>
  );
};

export const FloralDivider = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-4 opacity-75 ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#f48fa3]" />
      <span className="text-[#e85d7b] text-sm">❧</span>
      <span className="text-[#e85d7b] text-base">♡</span>
      <span className="text-[#e85d7b] text-sm">☙</span>
      <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#f48fa3]" />
    </div>
  );
};
