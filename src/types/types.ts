export type KeyOfMap<M extends Map<unknown, unknown>> =
  M extends Map<infer K, unknown> ? K : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MapValue<T> = T extends Map<any, infer V> ? V : never;
