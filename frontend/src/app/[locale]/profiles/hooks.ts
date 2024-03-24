"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useReducer } from "react";

interface State {
  profileType: string[];
  cities: string[];
  experiences: string[];
  speaks: string[];
  reads: string[];
  goals: string[];
}

interface ActionToggle {
  type: "toggle";
  key: keyof State;
  payload: string;
}

interface ActionReset {
  type: "reset";
  key?: keyof State;
}

interface ActionSet {
  type: "set";
  key: keyof State;
  value: string;
}

type Action = ActionToggle | ActionReset | ActionSet;

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
    } satisfies State;
  }

  if (action.type === "set") {
    return { ...state, [action.key]: [action.value] };
  }

  if (state[action.key].includes(action.payload)) {
    state[action.key] = state[action.key].filter(
      (item) => item !== action.payload
    );
  } else {
    state[action.key] = state[action.key].concat(action.payload);
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
        cities: searchParams.getAll("city"),
        experiences: searchParams.getAll("experience"),
        speaks: searchParams.getAll("speaks"),
        reads: searchParams.getAll("reads"),
        goals: searchParams.getAll("goal"),
      } satisfies State)
  );

  const toggleCity = useCallback(
    (city: string) => {
      dispatch({ key: "cities", payload: city, type: "toggle" });
    },
    [dispatch]
  );

  const toggleExperience = useCallback(
    (experience: string) => {
      dispatch({ key: "experiences", payload: experience, type: "toggle" });
    },
    [dispatch]
  );

  const toggleSpeaks = useCallback(
    (speaks: string) => {
      dispatch({ key: "speaks", payload: speaks, type: "toggle" });
    },
    [dispatch]
  );

  const toggleReads = useCallback(
    (reads: string) => {
      dispatch({ key: "reads", payload: reads, type: "toggle" });
    },
    [dispatch]
  );

  const toggleGoals = useCallback(
    (goal: string) => {
      dispatch({ key: "goals", payload: goal, type: "toggle" });
    },
    [dispatch]
  );

  const setProfileType = useCallback(
    (value: string) => {
      dispatch({ key: "profileType", type: "set", value });
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch({ type: "reset" });
  }, [dispatch]);

  const resetFilter = useCallback(
    (key?: keyof State) => {
      dispatch({ type: "reset", key });
    },
    [dispatch]
  );

  function applyFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete("profileType");
    params.delete("city");
    params.delete("speaks");
    params.delete("reads");
    params.delete("experience");
    params.delete("goal");

    if (state.profileType.length) {
      params.set("profileType", state.profileType[0]);
    }

    for (const city of state.cities) {
      params.append("city", city);
    }

    for (const alpha2 of state.speaks) {
      params.append("speaks", alpha2);
    }

    for (const alpha2 of state.reads) {
      params.append("reads", alpha2);
    }

    for (const code of state.experiences) {
      params.append("experience", code);
    }

    for (const goal of state.goals) {
      params.append("goal", goal);
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return {
    profileType: state.profileType,
    cities: state.cities,
    experiences: state.experiences,
    speaks: state.speaks,
    reads: state.reads,
    goals: state.goals,
    toggleGoals,
    toggleCity,
    toggleExperience,
    toggleSpeaks,
    toggleReads,
    applyFilters,
    resetFilters,
    resetFilter,
    setProfileType,
  };
}
