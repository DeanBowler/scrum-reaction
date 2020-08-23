// eslint-disable-next-line @typescript-eslint/ban-types
export default function isEmpty<T extends Object>(value: T | undefined | null) {
  return (
    value == null ||
    (Object.prototype.hasOwnProperty.call(value, 'length') &&
      (value as any)['length'] === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}
