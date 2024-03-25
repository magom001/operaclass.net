"use client";

import { Chip } from "@/components/Chip";
import { City } from "@/services/cities";
import { Experience } from "@/services/experiences";
import { Language } from "@/services/languages";
import { AdjustmentsVerticalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { HTMLAttributes, useEffect, useReducer, useRef } from "react";
import { useFilters } from "./hooks";
import { Goal } from "@/services/goals";
import { CodeNameType } from "@/services/types";

interface Props {
  profileTypes?: CodeNameType[];
  cities?: City[];
  languages?: Language[];
  experiences?: Experience[];
  goals?: Goal[];
  onApplyFilters?: () => void;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}

export function Filters({
  profileTypes: allProfileTypes,
  cities: allCities,
  languages: allLanguages,
  experiences: allExperiences,
  goals: allGoals,
  onApplyFilters,
  className,
}: Props) {
  const {
    profileType,
    setProfileType,
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
    onApplyFilters?.();
  }

  return (
    <div className={`h-full grid grid-rows-[1fr_auto] ${className}`}>
      <div className="overflow-y-auto">
        <div className="p-4 grid grid-flow-row gap-y-4">
          {/* Profile type section */}
          {allProfileTypes?.length ? (
            <div>
              <h2 className="capitalize font-thin antialiased mb-1">
                {t("Filters.profile-type")}
              </h2>
              <ul className="flex flex-row flex-wrap gap-1.5">
                <li>
                  <button
                    role="button"
                    onClick={resetFilter.bind(null, "profileType")}
                    className="capitalize"
                  >
                    <Chip active={!profileType.length}>{t("Common.all")}</Chip>
                  </button>
                </li>
                {allProfileTypes.map((x) => (
                  <li key={x.code}>
                    <button
                      key={x.code}
                      role="button"
                      onClick={() => {
                        setProfileType(x.code);
                      }}
                    >
                      <Chip
                        active={profileType.includes(x.code)}
                        className="first-letter:capitalize"
                      >
                        {x.name}
                      </Chip>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* City section */}
          {allCities && allCities.length > 0 && (
            <div>
              <h2 className="capitalize font-thin antialiased mb-1">
                {t("Filters.city")}
              </h2>
              <ul className="flex flex-row flex-wrap gap-1.5">
                <li>
                  <button
                    role="button"
                    onClick={resetFilter.bind(null, "cities")}
                    className="capitalize"
                  >
                    <Chip active={!cities.length}>{t("Common.all")}</Chip>
                  </button>
                </li>
                {allCities.map((city) => (
                  <li key={city.code}>
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
              <ul className="flex flex-row flex-wrap gap-1.5">
                <li>
                  <button
                    role="button"
                    onClick={resetFilter.bind(null, "speaks")}
                    className="capitalize"
                  >
                    <Chip active={!speaks.length}>{t("Common.all")}</Chip>
                  </button>
                </li>
                {allLanguages.map((language) => (
                  <li key={language.alpha2}>
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
              <ul className="flex flex-row flex-wrap gap-1.5">
                <li>
                  <button
                    role="button"
                    onClick={resetFilter.bind(null, "reads")}
                    className="capitalize"
                  >
                    <Chip active={!reads.length}>{t("Common.all")}</Chip>
                  </button>
                </li>
                {allLanguages.map((language) => (
                  <li key={language.alpha2}>
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
              <ul className="flex flex-row flex-wrap gap-1.5">
                <li>
                  <button
                    role="button"
                    onClick={resetFilter.bind(null, "experiences")}
                    className="capitalize"
                  >
                    <Chip active={!experiences.length}>{t("Common.all")}</Chip>
                  </button>
                </li>
                {allExperiences.map((experience) => (
                  <li key={experience.code}>
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
              <ul className="flex flex-row flex-wrap gap-1.5">
                <li>
                  <button
                    role="button"
                    onClick={resetFilter.bind(null, "goals")}
                    className="capitalize"
                  >
                    <Chip active={!goals.length}>{t("Common.all")}</Chip>
                  </button>
                </li>
                {allGoals.map((goal) => (
                  <li key={goal.code}>
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
          className="bg-gray-100 text-gray-800 antialiased rounded-full shadow-sm hover:shadow-md px-4 py-1 capitalize hover:scale-[1.05] opacity-80 hover:opacity-100 transition-all"
          onClick={resetFilters}
        >
          {t("Common.reset")}
        </button>
        <button
          role="button"
          title={t("Common.apply")}
          onClick={handleSearch}
          className="bg-gray-800 text-gray-100 antialiased rounded-full px-4 py-1 capitalize hover:scale-[1.05] shadow-sm hover:shadow-md transition-all"
        >
          {t("Common.apply")}
        </button>
      </div>
    </div>
  );
}

export function FiltersMobile({
  profileTypes: allProfileTypes,
  cities: allCities,
  languages: allLanguages,
  experiences: allExperiences,
  goals: allGoals,
}: Props) {
  const [isOpened, toggleIsOpened] = useReducer((state) => !state, false);
  const t = useTranslations();

  return (
    <FiltersModal
      opened={isOpened}
      toggleOpened={toggleIsOpened}
      disclosure={
        <button
          title={t("Filters.open-filters")}
          role="button"
          type="button"
          className="lg:hidden bg-gray-800 text-gray-100 p-2 rounded-full opacity-50 fixed bottom-16 right-6 z-2 shadow-lg"
          onClick={toggleIsOpened}
        >
          <AdjustmentsVerticalIcon className="h-10 w-10" />
        </button>
      }
    >
      <Filters
        profileTypes={allProfileTypes}
        cities={allCities}
        experiences={allExperiences}
        goals={allGoals}
        languages={allLanguages}
        onApplyFilters={toggleIsOpened}
      />
    </FiltersModal>
  );
}

export function FiltersModal({
  children,
  opened,
  toggleOpened,
  disclosure,
}: {
  opened: boolean;
  toggleOpened: any;
  children: React.ReactNode;
  disclosure: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const t = useTranslations();

  useEffect(() => {
    if (opened) {
      dialogRef.current?.showModal();
      document.body.classList.add("overflow-hidden");
    } else {
      dialogRef.current?.close();
      document.body.classList.remove("overflow-hidden");
    }
  }, [opened]);

  return (
    <>
      <div
        className="fixed inset-0 backdrop-blur-sm bg-transparent z-30"
        hidden={!opened}
      />
      <dialog className="h-dvh w-dvw rounded-md z-50" ref={dialogRef}>
        <div className="fixed top-4 right-6 flex h-12 justify-end pr-2 float-right">
          <button
            onClick={toggleOpened}
            title={t("Common.close")}
            role="button"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
        {children}
      </dialog>
      {disclosure}
    </>
  );
}
