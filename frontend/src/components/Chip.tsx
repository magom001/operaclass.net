"use client";

import type { HTMLAttributes } from "react";

export function Chip({
  children,
  active,
  className = "",
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}) {
  return (
    <span
      className={`inline-block px-4 md:px-3 py-1.5 md:py-1 antialiased rounded-full text-sm shadow-sm  transition-all font-semibold ${
        active
          ? "text-gray-100 bg-gray-800 cursor-default"
          : "text-gray-800 bg-gray-100 hover:shadow-md hover:scale-[1.02]"
      }  ${className}`}
    >
      {children}
    </span>
  );
}
