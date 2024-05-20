import { useReducer, useEffect, useCallback } from "react";
import { UseDataProps } from "./types";

type StateProps<T> = {
  data?: T;
  error?: string;
  isLoading: boolean;
};

type ActionProps<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: string };

export default function useData<T = unknown>({
  fn,
  deps,
  shouldRun = true,
}: UseDataProps<T>) {
  // variavel para controle se o componente for desmontado não atualiza os estados
  let isMounted: Boolean;
  const [updateData, forceUpdateData] = useReducer((x) => x + 1, 0);

  const initialState: StateProps<T> = {
    error: undefined,
    data: undefined,
    isLoading: true,
  };

  const reducer = (state: StateProps<T>, action: ActionProps<T>) => {
    switch (action.type) {
      case "loading":
        return { ...initialState, isLoading: true };
      case "fetched":
        return { ...initialState, data: action.payload, isLoading: false };
      case "error":
        return { ...initialState, error: action.payload, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isLoading: shouldRun,
  });

  const handleFetch = useCallback(async () => {
    try {
      
      if (!state.isLoading) {
        dispatch({type: "loading"})
      }
      isMounted = true;

      const response = await fn();
      if (isMounted) {
        dispatch({ type: "fetched", payload: response });
      }
    } catch (error) {
      if (isMounted) {
        dispatch({ type: "error", payload: error as string });
      }
    }
  }, [deps, updateData]);

  useEffect(() => {
    if (shouldRun) {
      handleFetch();
    }

    return () => {
      isMounted = false;
    };
  }, [handleFetch]);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    forceUpdateData,
  };
}
