import { useState, useEffect } from 'react';

export default function useDebouncedState<TValue>(value: TValue, delay: number = 100) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounced;
}
