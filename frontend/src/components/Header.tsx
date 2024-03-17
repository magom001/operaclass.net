"use client";

import { Link, usePathname } from "@/i18n";
import { useTranslations } from "next-intl";
import { useReducer } from "react";
import LanguageSwitcher from "../app/LanguageSwitcher";

const paths = [
  { href: "/pianists/", label: "pianists" },
  { href: "/news/", label: "news" },
  { href: "/join-us/", label: "join-us" },
  { href: "/donate/", label: "donate" },
];

export default function Header() {
  const [opened, toggleOpened] = useReducer((state) => !state, false);
  const t = useTranslations();
  const p = usePathname();

  return (
    <>
      <header className="bg-gray-900 shadow-md text-gray-100 fixed top-0 left-0 right-0 h-[var(--header-height)] flex items-center justify-between antialiased px-8 z-50">
        <Link className="text-xl" href="/">
          OperaClass.Net
        </Link>
        <nav className="hidden lg:flex flex-row items-center">
          <ul
            onClick={toggleOpened}
            className="text-md [&>li]:first-letter:capitalize divide-x px-4 [&>li]:px-4 text-right pl-16 flex flex-row"
          >
            {paths.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${p.startsWith(href) ? "font-bold" : ""}`}
                >
                  {t(label)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher className="text-xs" />
        </nav>
        <button
          type="button"
          className="w-[28px] h-[20px] relative lg:hidden"
          onClick={toggleOpened}
          title={t("toggle-menu")}
        >
          <span
            className={`block absolute top-0 w-full h-[3px] bg-white transition-all duration-300 ${
              opened ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block absolute w-full top-[8px] h-[3px] bg-white transition-transform duration-300 ${
              opened ? "rotate-45" : ""
            }`}
          />
          <span
            className={`block absolute w-full top-[8px] h-[3px] bg-white transition-transform duration-300 ${
              opened ? "-rotate-45" : ""
            }`}
          />
          <span
            className={`block absolute top-[16px] w-full h-[3px] bg-white transition-all duration-300 ${
              opened ? "opacity-0" : "opacity-100"
            }`}
          />
        </button>
      </header>
      <div
        onClick={toggleOpened}
        className="fixed lg:hidden inset-0 backdrop-blur-sm bg-transparent z-30"
        hidden={!opened}
      />
      <aside
        aria-hidden={!opened}
        tabIndex={-1}
        className={`fixed flex lg:hidden flex-col justify-between items-center top-0 pt-[80px] pr-4 pl-4 pb-4 z-40 right-0 bottom-0 ${
          opened ? "" : "-mr-[100%]"
        }  bg-white shadow-lg transition-all duration-300`}
      >
        <nav>
          <ul
            onClick={toggleOpened}
            className="text-xl space-y-8 [&>li]:first-letter:capitalize text-right pl-16"
          >
            {paths.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${p.startsWith(href) ? "font-bold" : ""}`}
                >
                  {t(label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher className="text-xs" />
      </aside>
    </>
  );
}