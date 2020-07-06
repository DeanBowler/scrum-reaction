export default function isEmpty<T extends Object>(value: T | undefined | null) {
  return (
    value == null ||
    (value.hasOwnProperty('length') && (value as any)['length'] === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}
