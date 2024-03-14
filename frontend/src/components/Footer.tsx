"use client";

export default function Footer() {
  return (
    <footer className="h-[var(--footer-height)] flex items-center justify-center px-8 text-center text-xs text-white bg-gray-950">
      © {new Date().getFullYear()} OperaClass.Net
    </footer>
  );
}
