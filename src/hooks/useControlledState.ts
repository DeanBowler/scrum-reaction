import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * Works like useState only the state updates when the passed value is changed
 *
 * This is useful for situations where you want state to reflect change immediately,
 * but also reflect incoming changes from a server response.
 */
export default function useControlledState<S>(
  value: S,
): [S, Dispatch<SetStateAction<S>>] {
  const [localState, setLocalState] = useState<S>(value);

  useEffect(() => setLocalState(value), [value]);

  return [localState, setLocalState];
}
