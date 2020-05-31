export default function isEmpty<T extends any>(value: T) {
  return (
    value == null ||
    (value.hasOwnProperty('length') && value['length'] === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  );
}
