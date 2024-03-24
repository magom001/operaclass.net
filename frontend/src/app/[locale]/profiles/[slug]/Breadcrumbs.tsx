"use client";

import { Link, useRouter } from "@/i18n";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";

export function Breadcrumbs({
  name,
  className,
}: {
  name: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}) {
  const { back } = useRouter();
  const t = useTranslations();
  const params = useSearchParams();

  return (
    <div className={` ${className}`}>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              {params.has("q") ? (
                <button
                  type="button"
                  onClick={back}
                  title={t("Common.back")}
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ms-2 first-letter:capitalize"
                >
                  {t("Profiles.profiles")}
                </button>
              ) : (
                <Link
                  href="/profiles/"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ms-2 first-letter:capitalize"
                >
                  {t("Profiles.profiles")}
                </Link>
              )}
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRightIcon className="w-3 h-3 text-gray-400" />
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 ">
                {name}
              </span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
}
