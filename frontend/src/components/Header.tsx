"use client";

import { Link, usePathname } from "@/i18n";
import { useTranslations } from "next-intl";
import { useReducer } from "react";
import LanguageSwitcher from "../app/LanguageSwitcher";
import Image from "next/image";
import icon0 from "../app/icon0.svg";

const paths = [
  { href: "/profiles/", label: "profiles" },
  { href: "/blog/", label: "blog" },
  { href: "/join-us/", label: "join-us" },
  // { href: "/donate/", label: "donate" },
  { href: "/feedback/", label: "feedback" },
];

export default function Header({ whatIsOnLink }: { whatIsOnLink?: string }) {
  const [opened, toggleOpened] = useReducer((state) => !state, false);
  const t = useTranslations();
  const p = usePathname();

  const menuItems = whatIsOnLink 
    ? [{ href: whatIsOnLink, label: "what-is-on" }, ...paths]
    : paths;

  return (
    <>
      <header className="bg-gray-900 shadow-md text-gray-100 fixed top-0 left-0 right-0 h-[var(--header-height)] flex items-center justify-between antialiased px-8 z-50">
        <Link className="text-xl flex items-center gap-2" href="/">
          <Image 
            src={icon0} 
            alt="OperaClass.net logo" 
            width={32} 
            height={32}
            className="rounded-full"
          />
          OperaClass.net
        </Link>
        <nav className="hidden lg:flex flex-row items-center">
          <ul
            onClick={toggleOpened}
            className="text-md [&>li]:first-letter:capitalize divide-x px-4 [&>li]:px-4 text-right pl-16 flex flex-row"
          >
            {menuItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`first-letter:capitalize ${
                    label === "what-is-on"
                      ? "font-bold text-yellow-400"
                      : p.startsWith(href) 
                      ? "font-bold" 
                      : ""
                  }`}
                >
                  {t(label)}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher className="text-xs" />
        </nav>
        <BurgerButton
          opened={opened}
          toggleOpened={toggleOpened}
          title={t("toggle-menu")}
        />
      </header>
      <div
        onClick={toggleOpened}
        className="fixed lg:hidden inset-0 backdrop-blur-xs bg-transparent z-30"
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
            {menuItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${
                    label === "what-is-on"
                      ? "font-bold text-yellow-400"
                      : p.startsWith(href) 
                      ? "font-bold" 
                      : ""
                  }`}
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

function BurgerButton({
  opened,
  toggleOpened,
  title,
}: {
  opened: boolean;
  toggleOpened: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      className="w-[28px] h-[20px] relative lg:hidden"
      onClick={toggleOpened}
      title={title}
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
  );
}
