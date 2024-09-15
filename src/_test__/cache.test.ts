import { myCache, MyCache, type TStoreItem } from "@/myCache.js";

const randomItems: TStoreItem[] = [
  ["item1", { value: "Hello, World!", duration: 10 }],
  ["item2", { value: 42, duration: null }],
  ["item3", { value: { key: "value" }, duration: 5 }],
  ["item4", { value: [1, 2, 3], duration: 20 }],
];

describe("myCache", () => {
  test("save a new item", () => {
    const testCache = myCache();

    const testItem: TStoreItem = ["test", { value: 1, duration: 1000 }];

    expect(() => testCache.get(testItem[0])).toThrow();
    expect(() => testCache.get(testItem[0])).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${testItem[0]}' not found`
    );

    testCache.save(testItem[0], testItem[1].value, testItem[1].duration);

    const cacheItem = testCache.get(testItem[0]);

    expect(cacheItem).toBeDefined();
    expect(cacheItem).toStrictEqual(testItem[1]);
  });

  test("get a specific item", () => {
    const testCache = myCache();
    const testItem: TStoreItem = ["test", { value: 1, duration: 1000 }];

    testCache.save(testItem[0], testItem[1].value, testItem[1].duration);

    const cacheItem = testCache.get(testItem[0]);

    expect(cacheItem).toBeDefined();
    expect(cacheItem).toStrictEqual(testItem[1]);
  });

  test("throws error on get unexisting item", () => {
    const testCache = myCache();
    const testItem: TStoreItem = ["test", { value: 1, duration: 1000 }];

    expect(() => testCache.get(testItem[0])).toThrow();
    expect(() => testCache.get(testItem[0])).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${testItem[0]}' not found`
    );
  });

  test("get all items", () => {
    const testCache = myCache();

    const allItems = testCache.getAll();

    // Cache is empty on initialization
    expect(allItems).toBeDefined();
    expect(allItems).toHaveLength(0);

    randomItems.forEach((item) => {
      testCache.save(item[0], item[1].value, item[1]?.duration);
    });

    const newAllItems = testCache.getAll();

    expect(newAllItems).toHaveLength(randomItems.length);
    newAllItems.forEach((entry, index) => {
      expect(entry[0]).toStrictEqual(randomItems[index]?.[0]);
      expect(entry[1]).toStrictEqual(randomItems[index]?.[1]);
    });
  });

  test("delete a specific item", () => {
    const testCache = myCache();

    // Fill the cache with random items
    randomItems.forEach((item) => {
      testCache.save(item[0], item[1].value, item[1]?.duration);
    });

    const item1 = testCache.get(randomItems[0]![0]);

    expect(item1).toBeDefined();

    testCache.remove(randomItems[0]![0]);

    expect(() => testCache.get(randomItems[0]![0])).toThrow();
    expect(() => testCache.get(randomItems[0]![0])).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${randomItems[0]![0]}' not found`
    );
  });

  test("throws error on delete unexisting item", () => {
    const testCache = myCache();
    const nonExistingKey = "NON_EXISTING_ITEM";

    expect(() => testCache.get(nonExistingKey)).toThrow();
    expect(() => testCache.get(nonExistingKey)).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${nonExistingKey}' not found`
    );
  });

  test("empties the cache", () => {
    const testCache = myCache();

    // Fill the cache with random items
    randomItems.forEach((item) => {
      testCache.save(item[0], item[1].value, item[1]?.duration);
    });

    const cacheItems = testCache.getAll();

    expect(cacheItems.length).toBeGreaterThan(0);

    // Empty the cache
    testCache.clear();

    const newCacheItems = testCache.getAll();

    expect(newCacheItems.length).toEqual(0);
  });
});

describe("MyCache", () => {
  test("save a new item", () => {
    const testCache = new MyCache();
    const testItem: TStoreItem = ["test", { value: 1, duration: 1000 }];

    expect(() => testCache.get(testItem[0])).toThrow();
    expect(() => testCache.get(testItem[0])).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${testItem[0]}' not found`
    );

    testCache.save(testItem[0], testItem[1].value, testItem[1].duration);

    const cacheItem = testCache.get(testItem[0]);

    expect(cacheItem).toBeDefined();
    expect(cacheItem).toStrictEqual(testItem[1]);
  });

  test("get a specific item", () => {
    const testCache = new MyCache();
    const testItem: TStoreItem = ["test", { value: 1, duration: 1000 }];

    testCache.save(testItem[0], testItem[1].value, testItem[1].duration);

    const cacheItem = testCache.get(testItem[0]);

    expect(cacheItem).toBeDefined();
    expect(cacheItem).toStrictEqual(testItem[1]);
  });

  test("throws error on get unexisting item", () => {
    const testCache = new MyCache();
    const testItem: TStoreItem = ["test", { value: 1, duration: 1000 }];

    expect(() => testCache.get(testItem[0])).toThrow();
    expect(() => testCache.get(testItem[0])).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${testItem[0]}' not found`
    );
  });

  test("get all items", () => {
    const testCache = new MyCache();

    const allItems = testCache.getAll();

    // Cache is empty on initialization
    expect(allItems).toBeDefined();
    expect(allItems).toHaveLength(0);

    randomItems.forEach((item) => {
      testCache.save(item[0], item[1].value, item[1]?.duration);
    });

    const newAllItems = testCache.getAll();

    expect(newAllItems).toHaveLength(randomItems.length);
    newAllItems.forEach((entry, index) => {
      expect(entry[0]).toStrictEqual(randomItems[index]?.[0]);
      expect(entry[1]).toStrictEqual(randomItems[index]?.[1]);
    });
  });

  test("delete a specific item", () => {
    const testCache = new MyCache();

    // Fill the cache with random items
    randomItems.forEach((item) => {
      testCache.save(item[0], item[1].value, item[1]?.duration);
    });

    const item1 = testCache.get(randomItems[0]![0]);

    expect(item1).toBeDefined();

    testCache.delete(randomItems[0]![0]);

    expect(() => testCache.get(randomItems[0]![0])).toThrow();
    expect(() => testCache.get(randomItems[0]![0])).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${randomItems[0]![0]}' not found`
    );
  });

  test("throws error on delete unexisting item", () => {
    const testCache = new MyCache();
    const nonExistingKey = "NON_EXISTING_ITEM";

    expect(() => testCache.get(nonExistingKey)).toThrow();
    expect(() => testCache.get(nonExistingKey)).toThrowError(
      // eslint-disable-next-line prettier/prettier
      `Cache for key '${nonExistingKey}' not found`
    );
  });

  test("empties the cache", () => {
    const testCache = new MyCache();

    // Fill the cache with random items
    randomItems.forEach((item) => {
      testCache.save(item[0], item[1].value, item[1]?.duration);
    });

    const cacheItems = testCache.getAll();

    expect(cacheItems.length).toBeGreaterThan(0);

    // Empty the cache
    testCache.clear();

    const newCacheItems = testCache.getAll();

    expect(newCacheItems.length).toEqual(0);
  });
});
