"use client";

import { usePathname, useRouter } from "@/i18n";
import type { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLUListElement>["className"];
}

export default function LanguageSwitcher({ className }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ul
      className={`flex flex-row divide-solid divide-current divide-x ${className}`}
    >
      <li className="px-4">
        <button
          type="button"
          onClick={() => router.replace(pathname, { locale: "en" })}
        >
          EN
        </button>
      </li>
      <li className="px-4">
        <button
          type="button"
          onClick={() => router.replace(pathname, { locale: "ru" })}
        >
          РУ
        </button>
      </li>
    </ul>
  );
}
