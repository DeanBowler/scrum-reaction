import { reduce, pipe, defaultTo, inc, max, toPairs, head } from 'ramda';

const occurences = reduce(
  (acc, x: number) => ({
    ...acc,
    [x]: pipe(defaultTo(0), inc)(acc[x]),
  }),
  Object.create(null),
);

const largestPair = reduce(
  ([k0, v0], [k1, v1]) => {
    const maxVal = max(v0, v1);
    const keyOfLargest = maxVal > v0 ? k1 : k0;
    return [keyOfLargest, maxVal];
  },
  [null, -Infinity],
);

const mode = pipe(occurences, toPairs, largestPair, head);

export default mode;
