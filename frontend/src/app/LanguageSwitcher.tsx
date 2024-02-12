"use client";

import { usePathname, useRouter } from "@/i18n";

interface Props {
  className?: string;
}

export default function LanguageSwitcher({ className }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ul
      className={`flex flex-row divide-solid divide-current divide-x-2 ${className}`}
    >
      <li className="px-4">
        <button
          type="button"
          onClick={() => router.push(pathname, { locale: "en" })}
        >
          EN
        </button>
      </li>
      <li className="px-4">
        <button
          type="button"
          onClick={() => router.push(pathname, { locale: "ru" })}
        >
          РУ
        </button>
      </li>
    </ul>
  );
}
