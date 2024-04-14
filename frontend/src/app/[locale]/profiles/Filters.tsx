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
    cities,
    speaks,
    reads,
    goals,
    experiences,
    phonetics,
    setFilter,
    applyFilters,
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
          <FilterBlock
            title={t("Filters.profile-type")}
            allItems={allProfileTypes}
            selected={profileType}
            displayName={(item) => item.name}
            onReset={() => resetFilter("profileType")}
            isActive={(item) => profileType.includes(item.code)}
            onSelect={(item) => setFilter("profileType", item.code, "set")}
          />

          {/* City section */}
          <FilterBlock
            title={t("Filters.city")}
            allItems={allCities}
            selected={cities}
            displayName={(item) => item.name}
            onReset={() => resetFilter("cities")}
            isActive={(item) => cities.includes(item.code)}
            onSelect={(item) => setFilter("cities", item.code)}
          />

          {/* Spoken language section */}
          <FilterBlock
            title={t("Filters.fluently-speak")}
            allItems={allLanguages}
            selected={speaks}
            displayName={(item) => item.name}
            onReset={() => resetFilter("speaks")}
            isActive={(item) => speaks.includes(item.alpha2)}
            onSelect={(item) => setFilter("speaks", item.alpha2)}
          />

          {/* Read language section */}
          <FilterBlock
            title={t("Filters.reads")}
            allItems={allLanguages}
            selected={reads}
            displayName={(item) => item.name}
            onReset={() => resetFilter("reads")}
            isActive={(item) => reads.includes(item.alpha2)}
            onSelect={(item) => setFilter("reads", item.alpha2)}
          />

          {/* Phonetics for language coaches */}
          <FilterBlock
            title={t("Filters.phonetics")}
            allItems={allLanguages}
            selected={phonetics}
            displayName={(item) => item.name}
            onReset={() => resetFilter("phonetics")}
            isActive={(item) => phonetics.includes(item.alpha2)}
            onSelect={(item) => setFilter("phonetics", item.alpha2)}
          />

          {/* Experience section */}
          <FilterBlock
            title={t("Filters.experience")}
            allItems={allExperiences}
            selected={experiences}
            displayName={(item) => item.name}
            onReset={() => resetFilter("experiences")}
            isActive={(item) => experiences.includes(item.code)}
            onSelect={(item) => setFilter("experiences", item.code)}
          />

          {/* Goals section */}
          <FilterBlock
            title={t("Filters.goals")}
            allItems={allGoals}
            selected={goals}
            displayName={(item) => item.name}
            onReset={() => resetFilter("goals")}
            isActive={(item) => goals.includes(item.code)}
            onSelect={(item) => setFilter("goals", item.code)}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-center p-4">
        <button
          role="button"
          className="bg-gray-100 text-gray-800 antialiased rounded-full shadow-sm hover:shadow-md px-4 py-1 capitalize hover:scale-[1.05] opacity-80 hover:opacity-100 transition-all"
          onClick={() => resetFilter(undefined)}
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

interface FilterBlockProps<T> {
  onReset(): void;
  title: string;
  selected: string[];
  allItems?: T[];
  onSelect(_: T): void;
  displayName(item: T): string;
  isActive(item: T): boolean;
}

function FilterBlock<T>({
  title,
  selected,
  allItems,
  displayName,
  isActive,
  onReset,
  onSelect,
}: FilterBlockProps<T>) {
  const t = useTranslations();

  if (!allItems || allItems.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="capitalize font-thin antialiased mb-1">{title}</h2>
      <ul className="flex flex-row flex-wrap gap-1.5">
        <li>
          <button role="button" onClick={onReset} className="capitalize">
            <Chip active={!selected.length}>{t("Common.all")}</Chip>
          </button>
        </li>
        {allItems.map((item, i) => (
          <li key={i}>
            <button
              role="button"
              onClick={() => {
                onSelect(item);
              }}
            >
              <Chip className="first-letter:capitalize" active={isActive(item)}>
                {displayName(item)}
              </Chip>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
