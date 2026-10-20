import { useEffect, useState } from "react";

export const useDebounce = (state, delay) => {
  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedState(state);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [state, delay]);

  return debouncedState;
};
