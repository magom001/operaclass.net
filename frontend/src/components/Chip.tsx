import { HTMLAttributes } from "react";

export function Chip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ${className}`}
    >
      {children}
    </span>
  );
}
