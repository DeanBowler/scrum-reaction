import { useRef, useEffect } from 'react';

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

interface Delta<T> {
  current: T | undefined;
  previous: T | undefined;
}

export function useDelta<T>(current: T): Delta<T> | null {
  const previous = usePrevious(current);

  if (current !== previous) {
    return { current, previous };
  }

  return null;
}

export function useDeltaChange<T>(value: T, fn: (delta: Delta<T>) => void) {
  const delta = useDelta(value);

  useEffect(() => {
    if (delta === null) return;

    fn(delta);
  }, [delta]);
}
