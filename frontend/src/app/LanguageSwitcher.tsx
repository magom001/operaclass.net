"use client";

import { usePathname, useRouter } from "@/i18n";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <button
        type="button"
        onClick={() => router.push(pathname, { locale: "en" })}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => router.push(pathname, { locale: "ru" })}
      >
        RU
      </button>
    </div>
  );
}
