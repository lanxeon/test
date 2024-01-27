import { useEffect, useState } from "react";

//generic debounce function
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      // if value changes restart timer
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
