"use client";

import { Chip } from "@/components/Chip";
import { City } from "@/services/cities";
import { Experience } from "@/services/experiences";
import { Language } from "@/services/languages";
import { AdjustmentsVerticalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useEffect, useReducer, useRef } from "react";
import { useFilters } from "./hooks";

interface Props {
  cities: City[];
  languages: Language[];
  experiences: Experience[];
}

export function Filters({
  cities: allCities,
  languages: allLanguages,
  experiences: allExperiences,
}: Props) {
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

  const {
    cities,
    toggleCity,
    speaks,
    toggleSpeaks,
    reads,
    toggleReads,
    experiences,
    toggleExperience,
    applyFilters,
  } = useFilters();

  const t = useTranslations();

  function handleSearch() {
    applyFilters();

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
        <div className="p-4 grid grid-flow-row space-y-4">
          <div>
            <h2 className="capitalize font-thin">{t("Filters.city")}</h2>
            <div>
              {allCities.map((city) => (
                <button
                  key={city.code}
                  role="button"
                  onClick={() => {
                    toggleCity(city.code);
                  }}
                >
                  <Chip
                    className={
                      cities.includes(city.code) ? "bg-sky-700 !text-white" : ""
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
              {t("Filters.fluently-speak")} (?)
            </h2>
            <div>
              {allLanguages.map((language) => (
                <button
                  key={language.alpha2}
                  role="button"
                  onClick={() => {
                    toggleSpeaks(language.alpha2);
                  }}
                >
                  <Chip
                    className={
                      speaks.includes(language.alpha2)
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

          <div>
            <h2 className="capitalize font-thin">{t("Filters.reads")}</h2>
            <div>
              {allLanguages.map((language) => (
                <button
                  key={language.alpha2}
                  role="button"
                  onClick={() => {
                    toggleReads(language.alpha2);
                  }}
                >
                  <Chip
                    className={
                      reads.includes(language.alpha2)
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

          <div>
            <h2 className="capitalize font-thin">{t("Filters.experience")}</h2>
            <div>
              {allExperiences.map((experience) => (
                <button
                  key={experience.code}
                  role="button"
                  onClick={() => {
                    toggleExperience(experience.code);
                  }}
                >
                  <Chip
                    className={
                      experiences.includes(experience.code)
                        ? "bg-sky-700 !text-white"
                        : ""
                    }
                  >
                    {experience.name}
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
        type="button"
        className="bg-black text-white p-2 rounded-full opacity-50 fixed bottom-14 right-6 z-2 shadow-lg"
        onClick={toggleIsOpened}
      >
        <AdjustmentsVerticalIcon className="h-10 w-10" />
      </button>
    </>
  );
}
