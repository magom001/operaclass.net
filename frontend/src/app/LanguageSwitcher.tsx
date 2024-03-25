"use client";

import { usePathname, useRouter } from "@/i18n";
import { useLocale } from "next-intl";
import type { HTMLAttributes } from "react";

interface Props {
  className?: HTMLAttributes<HTMLUListElement>["className"];
}

export default function LanguageSwitcher({ className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <ul
      className={`flex flex-row divide-solid divide-current divide-x ${className}`}
    >
      <li className={`px-4 ${locale === "en" ? "font-bold" : ""}`}>
        <button
          type="button"
          onClick={() => router.replace(pathname, { locale: "en" })}
        >
          EN
        </button>
      </li>
      <li className={`px-4 ${locale === "ru" ? "font-bold" : ""}`}>
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
