"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useReducer } from "react";

interface State {
  profileType: string[];
  cities: string[];
  experiences: string[];
  speaks: string[];
  phonetics: string[];
  reads: string[];
  goals: string[];
}

interface ActionReset {
  type: "reset";
  key?: keyof State;
}

interface ActionSet {
  type: "set" | "toggle";
  key: keyof State;
  value: string;
}

type Action = ActionReset | ActionSet;

function reducer(state: State, action: Action) {
  if (action.type === "reset") {
    if (action.key) {
      return { ...state, [action.key]: [] };
    }

    return {
      profileType: [],
      cities: [],
      experiences: [],
      speaks: [],
      reads: [],
      goals: [],
      phonetics: [],
    } satisfies State;
  }

  if (action.type === "set") {
    return { ...state, [action.key]: [action.value] };
  }

  if (state[action.key].includes(action.value)) {
    state[action.key] = state[action.key].filter(
      (item) => item !== action.value
    );
  } else {
    state[action.key] = state[action.key].concat(action.value);
  }

  return { ...state };
}

export function useFilters() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [state, dispatch] = useReducer(
    reducer,
    {},
    () =>
      ({
        profileType: [searchParams.get("profileType") || ""].filter(Boolean),
        cities: searchParams.getAll("cities"),
        experiences: searchParams.getAll("experiences"),
        speaks: searchParams.getAll("speaks"),
        reads: searchParams.getAll("reads"),
        goals: searchParams.getAll("goals"),
        phonetics: searchParams.getAll("phonetics"),
      } satisfies State)
  );

  const setFilter = useCallback(
    (key: keyof State, value: string, type: "set" | "toggle" = "toggle") => {
      dispatch({ key, value: value, type });
    },
    [dispatch]
  );

  const resetFilter = useCallback(
    (key?: keyof State) => {
      dispatch({ type: "reset", key });
    },
    [dispatch]
  );

  function applyFilters() {
    const params = new URLSearchParams(searchParams);

    Object.getOwnPropertyNames(state).forEach((key) => {
      params.delete(key);

      const k = key as keyof State;

      if (state[k].length) {
        state[k].forEach((value) => {
          params.append(key, value);
        });
      }
    });

    replace(`${pathname}?${params.toString()}`);
  }

  return {
    profileType: state.profileType,
    cities: state.cities,
    experiences: state.experiences,
    speaks: state.speaks,
    reads: state.reads,
    goals: state.goals,
    phonetics: state.phonetics,
    applyFilters,
    resetFilter,
    setFilter,
  };
}
