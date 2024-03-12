import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useReducer } from "react";

interface State {
  cities: string[];
  experiences: string[];
  speaks: string[];
  reads: string[];
}

function reducer(state: State, action: { key: keyof State; payload: string }) {
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

  const [state, dispatch] = useReducer(reducer, {}, () => ({
    cities: searchParams.getAll("city"),
    experiences: searchParams.getAll("experience"),
    speaks: searchParams.getAll("speaks"),
    reads: searchParams.getAll("reads"),
  }));

  const toggleCity = useCallback(
    (city: string) => {
      dispatch({ key: "cities", payload: city });
    },
    [dispatch]
  );

  const toggleExperience = useCallback(
    (experience: string) => {
      dispatch({ key: "experiences", payload: experience });
    },
    [dispatch]
  );

  const toggleSpeaks = useCallback(
    (speaks: string) => {
      dispatch({ key: "speaks", payload: speaks });
    },
    [dispatch]
  );

  const toggleReads = useCallback(
    (reads: string) => {
      dispatch({ key: "reads", payload: reads });
    },
    [dispatch]
  );

  function applyFilters() {
    const params = new URLSearchParams(searchParams);

    params.delete("city");
    params.delete("speaks");
    params.delete("reads");
    params.delete("experience");

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

    replace(`${pathname}?${params.toString()}`);
  }

  return {
    cities: state.cities,
    experiences: state.experiences,
    speaks: state.speaks,
    reads: state.reads,
    toggleCity,
    toggleExperience,
    toggleSpeaks,
    toggleReads,
    applyFilters,
  };
}
