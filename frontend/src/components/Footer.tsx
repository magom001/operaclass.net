"use client";

import { useInView } from "react-intersection-observer";

export default function Footer() {
  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        document.body.classList.remove("footer-hidden");
      } else {
        document.body.classList.add("footer-hidden");
      }
    },
  });
  return (
    <footer
      ref={ref}
      className="h-[var(--footer-height)] flex items-center justify-center px-8 text-center text-xs text-gray-100 bg-gray-900 antialiased"
    >
      © {new Date().getFullYear()} OperaClass.Net
    </footer>
  );
}
