import type { MapValue } from "./types/types.js";

export type TStore = Map<string, { value: unknown; duration: number | null }>;
export type TStoreItem = readonly [string, MapValue<TStore>];

const randomItems: TStoreItem[] = [
  ["item1", { value: "Hello, World!", duration: 10 }],
  ["item2", { value: 42, duration: null }],
  ["item3", { value: { key: "value" }, duration: 5 }],
  ["item4", { value: [1, 2, 3], duration: 20 }],
];

console.log(randomItems[0]);

export function myCache() {
  const store: TStore = new Map();

  function get(key: string) {
    if (store.has(key)) return store.get(key);
    else throw new Error(`Cache for key '${key}' not found`);
  }

  function getAll() {
    return Array.from(store);
  }

  function save(key: string, value: unknown, duration: number | null = null) {
    store.set(key, { value, duration });
  }

  function remove(key: string) {
    if (store.has(key)) store.delete(key);
    else throw new Error(`Cache for key '${key}' not found`);
  }

  function clear() {
    store.clear();
  }

  return { get, getAll, save, remove, clear };
}

export class MyCache {
  private store: TStore = new Map();

  constructor() {}

  get(key: string) {
    if (this.store.has(key)) return this.store.get(key);
    else throw new Error(`Cache for key '${key}' not found`);
  }

  getAll() {
    return Array.from(this.store);
  }

  save(key: string, value: unknown, duration: number | null = null) {
    this.store.set(key, { value, duration });
  }

  delete(key: string) {
    if (this.store.has(key)) this.store.delete(key);
    else throw new Error(`Cache for key '${key}' not found`);
  }

  clear() {
    this.store.clear();
  }
}
