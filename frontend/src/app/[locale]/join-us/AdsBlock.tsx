"use client";

import { useTranslations } from "next-intl";

const ADS_URL =
  "https://www.profitablegatecpm.com/sg83ixtq8?key=c569352ec07c76cd6e220da7dac30d33";

export function AdsBlock() {
  const t = useTranslations();

  const handleClick = () => {
    window.open(ADS_URL, "_blank");
  };

  return (
    <span>
      {t.rich("SupportUs.click-the-add", {
        link: (x) => (
          <button
            className="text-blue-500 underline"
            type="button"
            onClick={handleClick}
            title={t("SupportUs.title")}
          >
            {x}
          </button>
        ),
      })}
    </span>
  );
}
