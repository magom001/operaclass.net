"use client";

import { Chip } from "@/components/Chip";
import { City } from "@/services/cities";
import { Language } from "@/services/languages";
import { AdjustmentsVerticalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useEffect, useReducer, useRef, useState } from "react";

interface Props {
  cities: City[];
  languages: Language[];
}

export function Filters({ cities, languages }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [isOpened, toggleIsOpened] = useReducer((state) => !state, false);

  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal();
      document.body.classList.add("overflow-hidden");
    } else {
      dialogRef.current?.close();
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpened]);

  const searchParams = useSearchParams();

  const [selectedCities, setCities] = useState(searchParams.getAll("city"));
  const [selectedLanguages, setLanguages] = useState(
    searchParams.getAll("speaks")
  );

  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations();

  function handleSearch() {
    const params = new URLSearchParams(searchParams);

    params.delete("city");
    params.delete("speaks");

    for (const city of selectedCities) {
      params.append("city", city);
    }

    for (const alpha2 of selectedLanguages) {
      params.append("speaks", alpha2);
    }

    console.log(btoa(params.toString()));

    replace(`${pathname}?${params.toString()}`);

    toggleIsOpened();
  }

  return (
    <>
      <div
        className="fixed inset-0 backdrop-blur-sm bg-transparent z-30"
        hidden={!isOpened}
      />
      <dialog className="h-svh w-svw rounded-md z-50" ref={dialogRef}>
        <div className="sticky top-0 flex h-12 justify-end pr-2 float-right">
          <button
            onClick={toggleIsOpened}
            title={t("Common.close")}
            role="button"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
        <div className="p-4">
          <div>
            <h2 className="capitalize font-thin">{t("Filters.city")}</h2>
            <div>
              {cities.map((city) => (
                <button
                  key={city.code}
                  role="button"
                  onClick={() => {
                    if (selectedCities.includes(city.code)) {
                      setCities(selectedCities.filter((c) => c !== city.code));
                    } else {
                      setCities([...selectedCities, city.code]);
                    }
                  }}
                >
                  <Chip
                    className={
                      selectedCities.includes(city.code)
                        ? "bg-sky-700 !text-white"
                        : ""
                    }
                  >
                    {city.name}
                  </Chip>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="capitalize font-thin">
              {t("Filters.fluently-speak")}
            </h2>
            <div>
              {languages.map((language) => (
                <button
                  key={language.alpha2}
                  role="button"
                  onClick={() => {
                    if (selectedLanguages.includes(language.alpha2)) {
                      setLanguages(
                        selectedLanguages.filter((c) => c !== language.alpha2)
                      );
                    } else {
                      setLanguages([...selectedLanguages, language.alpha2]);
                    }
                  }}
                >
                  <Chip
                    className={
                      selectedLanguages.includes(language.alpha2)
                        ? "bg-sky-700 !text-white"
                        : ""
                    }
                  >
                    {language.name}
                  </Chip>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-center h-12 bg-gradient-to-b from-transparent to-white">
          <button
            role="button"
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-full px-4 py-1 capitalize"
          >
            {t("Common.apply")}
          </button>
        </div>
      </dialog>
      <button
        title={t("Filters.open-filters")}
        role="button"
        className="bg-black text-white p-2 rounded-full opacity-50 fixed bottom-14 right-6 z-2 shadow-lg"
        onClick={toggleIsOpened}
      >
        <AdjustmentsVerticalIcon className="h-10 w-10" />
      </button>
    </>
  );
}
