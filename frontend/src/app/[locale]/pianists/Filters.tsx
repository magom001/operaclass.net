"use client";

import { Chip } from "@/components/Chip";
import { City } from "@/services/cities";
import { Experience } from "@/services/experiences";
import { Language } from "@/services/languages";
import { AdjustmentsVerticalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useEffect, useReducer, useRef } from "react";
import { useFilters } from "./hooks";
import { Goal } from "@/services/goals";

interface Props {
  cities?: City[];
  languages?: Language[];
  experiences?: Experience[];
  goals?: Goal[];
}

export function Filters({
  cities: allCities,
  languages: allLanguages,
  experiences: allExperiences,
  goals: allGoals,
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
    goals,
    toggleGoals,
    experiences,
    toggleExperience,
    applyFilters,
    resetFilters,
    resetFilter,
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
        <div className="h-full grid grid-rows-[0px_1fr_auto]">
          <div className="sticky top-0 flex h-12 justify-end pr-2 float-right">
            <button
              onClick={toggleIsOpened}
              title={t("Common.close")}
              role="button"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </div>
          <div className="overflow-y-auto">
            <div className="p-4 grid grid-flow-row space-y-4">
              {/* City section */}
              {allCities && allCities.length > 0 && (
                <div>
                  <h2 className="capitalize font-thin antialiased mb-1">
                    {t("Filters.city")}
                  </h2>
                  <ul className="flex flex-row flex-wrap">
                    <li className="mr-1">
                      <button
                        role="button"
                        onClick={resetFilter.bind(null, "cities")}
                        className="capitalize"
                      >
                        <Chip active={!cities.length}>{t("Common.all")}</Chip>
                      </button>
                    </li>
                    {allCities.map((city) => (
                      <li key={city.code} className="mr-1">
                        <button
                          key={city.code}
                          role="button"
                          onClick={() => {
                            toggleCity(city.code);
                          }}
                        >
                          <Chip active={cities.includes(city.code)}>
                            {city.name}
                          </Chip>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Spoken language section */}
              {allLanguages && allLanguages.length > 0 && (
                <div>
                  <h2 className="capitalize font-thin antialiased mb-1">
                    {t("Filters.fluently-speak")}
                  </h2>
                  <ul className="flex flex-row flex-wrap">
                    <li className="mr-1">
                      <button
                        role="button"
                        onClick={resetFilter.bind(null, "speaks")}
                        className="capitalize"
                      >
                        <Chip active={!speaks.length}>{t("Common.all")}</Chip>
                      </button>
                    </li>
                    {allLanguages.map((language) => (
                      <li key={language.alpha2} className="mr-1">
                        <button
                          key={language.alpha2}
                          role="button"
                          onClick={() => {
                            toggleSpeaks(language.alpha2);
                          }}
                        >
                          <Chip active={speaks.includes(language.alpha2)}>
                            {language.name}
                          </Chip>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Translation/pronunciation */}
              {allLanguages && allLanguages.length > 0 && (
                <div>
                  <h2 className="capitalize font-thin antialiased mb-1">
                    {t("Filters.reads")}
                  </h2>
                  <ul className="flex flex-row flex-wrap">
                    <li className="mr-1">
                      <button
                        role="button"
                        onClick={resetFilter.bind(null, "reads")}
                        className="capitalize"
                      >
                        <Chip active={!reads.length}>{t("Common.all")}</Chip>
                      </button>
                    </li>
                    {allLanguages.map((language) => (
                      <li key={language.alpha2} className="mr-1">
                        <button
                          key={language.alpha2}
                          role="button"
                          onClick={() => {
                            toggleReads(language.alpha2);
                          }}
                        >
                          <Chip active={reads.includes(language.alpha2)}>
                            {language.name}
                          </Chip>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience section */}
              {allExperiences && allExperiences.length > 0 && (
                <div>
                  <h2 className="capitalize font-thin antialiased mb-1">
                    {t("Filters.experience")}
                  </h2>
                  <ul className="flex flex-row flex-wrap">
                    <li className="mr-1">
                      <button
                        role="button"
                        onClick={resetFilter.bind(null, "experiences")}
                        className="capitalize"
                      >
                        <Chip active={!experiences.length}>
                          {t("Common.all")}
                        </Chip>
                      </button>
                    </li>
                    {allExperiences.map((experience) => (
                      <li key={experience.code} className="mr-1">
                        <button
                          key={experience.code}
                          role="button"
                          onClick={() => {
                            toggleExperience(experience.code);
                          }}
                        >
                          <Chip active={experiences.includes(experience.code)}>
                            {experience.name}
                          </Chip>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Goals section */}
              {allGoals && allGoals.length > 0 && (
                <div>
                  <h2 className="capitalize font-thin antialiased mb-1">
                    {t("Filters.goals")}
                  </h2>
                  <ul className="flex flex-row flex-wrap">
                    <li className="mr-1">
                      <button
                        role="button"
                        onClick={resetFilter.bind(null, "goals")}
                        className="capitalize"
                      >
                        <Chip active={!goals.length}>{t("Common.all")}</Chip>
                      </button>
                    </li>
                    {allGoals.map((goal) => (
                      <li key={goal.code} className="mr-1">
                        <button
                          role="button"
                          onClick={() => {
                            toggleGoals(goal.code);
                          }}
                        >
                          <Chip active={goals.includes(goal.code)}>
                            {goal.name}
                          </Chip>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 justify-center p-4">
            <button
              role="button"
              className="bg-gray-100 text-gray-800 antialiased rounded-full px-4 py-1 capitalize"
              onClick={resetFilters}
            >
              {t("Common.reset")}
            </button>
            <button
              role="button"
              title={t("Common.apply")}
              onClick={handleSearch}
              className="bg-gray-800 text-gray-100 antialiased rounded-full px-4 py-1 capitalize"
            >
              {t("Common.apply")}
            </button>
          </div>
        </div>
      </dialog>
      <button
        title={t("Filters.open-filters")}
        role="button"
        type="button"
        className="bg-gray-800 text-gray-100 p-2 rounded-full opacity-50 fixed bottom-14 right-6 z-2 shadow-lg"
        onClick={toggleIsOpened}
      >
        <AdjustmentsVerticalIcon className="h-10 w-10" />
      </button>
    </>
  );
}
