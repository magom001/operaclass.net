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
      className="h-[var(--footer-height)] flex flex-col items-center justify-center gap-1 px-8 text-center text-xs text-gray-100 bg-gray-900 antialiased"
    >
      <ul className="flex divide-x [&>li]:px-2">
        <li>
          <a
            href="https://www.facebook.com/groups/256892516983543/?ref=share_group_link"
            target="_blank"
            rel="noreferrer"
          >
            <span>Facebook</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/operaclass_net/?igsh=MWxjZDI2anhlaGg0bQ%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            <span>Instagram</span>
          </a>
        </li>
        <li>
          <a
            href="mailto:workshop@operaclass.net"
            target="_blank"
            rel="noreferrer"
          >
            <span>E-mail</span>
          </a>
        </li>
      </ul>
      <span>© {new Date().getFullYear()} OperaClass.Net</span>
    </footer>
  );
}
