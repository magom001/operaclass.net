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
      className={`inline-flex items-center px-3 py-1 antialiased rounded-full text-sm font-semibold ${
        active ? "text-gray-100" : "text-gray-800"
      } ${active ? "bg-gray-800" : "bg-gray-100"} ${className}`}
    >
      {children}
    </span>
  );
}
