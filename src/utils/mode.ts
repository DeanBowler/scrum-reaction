import { reduce, pipe, defaultTo, inc, max, toPairs, head } from 'ramda';

type OccuranceCount = { [k: number]: number | undefined };

const occurences = reduce(
  (acc: { [k: number]: number | undefined }, x: number) => ({
    ...acc,
    [x]: pipe((n: number | undefined) => defaultTo(0, n), inc)(acc[x]),
  }),
  Object.create(null) as OccuranceCount,
);

const largestPair = reduce(
  ([k0, v0], [k1, v1]) => {
    const maxVal = max(v0, v1);
    const keyOfLargest = v0 == null || maxVal > v0 ? k1 : k0;
    return [keyOfLargest, maxVal];
  },
  [null, -Infinity],
);

const mode = (values: readonly number[]) =>
  pipe(occurences, toPairs, largestPair, head)(values) as number;

export default mode;
