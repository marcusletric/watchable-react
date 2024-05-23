import { describe, test, expect } from "vitest";
import { Cache } from "../../lib";
import { Store, createStore } from "@watchable/store";
import { StateWithCachePartition } from "../../types";

describe("Cache", () => {
    test("Partition create works with the static method", () => {
        // Base case
        const store = createStore({ testPartition: {} });
        const partition = Cache.createDefaultCachePartition(store, "testPartition");

        expect(partition.read()).toStrictEqual({});
        partition.write({})
        expect(partition.read()).toStrictEqual({});
    })

    test("Cache entry addition and selection works with the static methods", () => {
        // Base case
        const store = createStore({});
        const partition = Cache.createDefaultCachePartition(store, "testPartition");

        Cache.addEntryToCache(store, "testPartition", "testFolder", "testId", { testEntry: null });
        expect(Cache.cacheEntrySelector(partition.read(), "testFolder", "testId")).toStrictEqual({ testEntry: null })
        expect(Cache.getEntryFromCache(store, "testPartition", "testFolder", "testId")).toStrictEqual({ testEntry: null })
    })

    test("Cache entry addition and selection works with the static methods 2", () => {
        // Base case
        const store = createStore({});
        const partition = Cache.createDefaultCachePartition(store, "testPartition");

        const branch:any[] = []
        const leaf = () => {}

        Cache.addEntryToCache(store, "testPartition", branch, leaf, { testEntry: null });
        expect(Cache.cacheEntrySelector(partition.read(), branch, leaf)).toStrictEqual({ testEntry: null })
        expect(Cache.getEntryFromCache(store, "testPartition", branch, leaf)).toStrictEqual({ testEntry: null })
    })

    test("Cache entry addition and selection with array, object and function based keys", () => {
        // Complex cases
        const store = createStore({});
        const partition1 = Cache.createDefaultCachePartition(store, "testPartition1");
        const partition2 = Cache.createDefaultCachePartition(store, "testPartition2");

        // The hash is only unique on arrays and objects if there is no deep equality
        // Function hashes are unique to their references
        const ref1:any[] = [1];
        const ref2:any[] = [];
        const ref3 = () => {};
        const ref4 = () => {};
        const ref5 = {a:null};
        const ref6 = {};

        Cache.addEntryToCache(store, "testPartition1", ref1, ref2, { testEntry1: null });
        Cache.addEntryToCache(store, "testPartition1", ref2, ref1, { testEntry2: null });
        Cache.addEntryToCache(store, "testPartition1", ref2, ref2, { testEntry3: null });
        Cache.addEntryToCache(store, "testPartition1", ref3, ref4, { testEntry4: null });
        Cache.addEntryToCache(store, "testPartition1", ref4, ref3, { testEntry5: null });
        Cache.addEntryToCache(store, "testPartition2", ref1, ref2, { testEntry6: null });
        Cache.addEntryToCache(store, "testPartition2", ref2, ref1, { testEntry7: null });
        Cache.addEntryToCache(store, "testPartition2", ref2, ref2, { testEntry8: null });
        Cache.addEntryToCache(store, "testPartition2", ref4, ref5, { testEntry9: null });
        Cache.addEntryToCache(store, "testPartition2", ref5, ref6, { testEntry10: null });
        Cache.addEntryToCache(store, "testPartition2", ref6, ref5, { testEntry11: null });


        expect(Cache.cacheEntrySelector(partition1.read(), ref1, ref2)).toStrictEqual({ testEntry1: null });
        expect(Cache.getEntryFromCache(store, "testPartition1", ref1, ref2)).toStrictEqual({ testEntry1: null });
        expect(Cache.cacheEntrySelector(partition1.read(), ref2, ref1)).toStrictEqual({ testEntry2: null });
        expect(Cache.getEntryFromCache(store, "testPartition1", ref2, ref1)).toStrictEqual({ testEntry2: null });
        expect(Cache.cacheEntrySelector(partition1.read(), ref2, ref2)).toStrictEqual({ testEntry3: null });
        expect(Cache.getEntryFromCache(store, "testPartition1", ref2, ref2)).toStrictEqual({ testEntry3: null });
        expect(Cache.cacheEntrySelector(partition1.read(), ref3, ref4)).toStrictEqual({ testEntry4: null });
        expect(Cache.getEntryFromCache(store, "testPartition1", ref3, ref4)).toStrictEqual({ testEntry4: null });
        expect(Cache.cacheEntrySelector(partition1.read(), ref4, ref3)).toStrictEqual({ testEntry5: null });
        expect(Cache.getEntryFromCache(store, "testPartition1", ref4, ref3)).toStrictEqual({ testEntry5: null });
        expect(Cache.cacheEntrySelector(partition2.read(), ref1, ref2)).toStrictEqual({ testEntry6: null });
        expect(Cache.getEntryFromCache(store, "testPartition2", ref1, ref2)).toStrictEqual({ testEntry6: null });
        expect(Cache.cacheEntrySelector(partition2.read(), ref2, ref1)).toStrictEqual({ testEntry7: null });
        expect(Cache.getEntryFromCache(store, "testPartition2", ref2, ref1)).toStrictEqual({ testEntry7: null });
        expect(Cache.cacheEntrySelector(partition2.read(), ref2, ref2)).toStrictEqual({ testEntry8: null });
        expect(Cache.getEntryFromCache(store, "testPartition2", ref2, ref2)).toStrictEqual({ testEntry8: null });
        expect(Cache.cacheEntrySelector(partition2.read(), ref4, ref5)).toStrictEqual({ testEntry9: null });
        expect(Cache.getEntryFromCache(store, "testPartition2", ref4, ref5)).toStrictEqual({ testEntry9: null });
        expect(Cache.cacheEntrySelector(partition2.read(), ref5, ref6)).toStrictEqual({ testEntry10: null });
        expect(Cache.getEntryFromCache(store, "testPartition2", ref5, ref6)).toStrictEqual({ testEntry10: null });
        expect(Cache.cacheEntrySelector(partition2.read(), ref6, ref5)).toStrictEqual({ testEntry11: null });
        expect(Cache.getEntryFromCache(store, "testPartition2", ref6, ref5)).toStrictEqual({ testEntry11: null });
    })

    test("Cache entry addition and selection works with the public methods", () => {
        // Base case
        const store = createStore({});
        const cache = new Cache<null>(store, "testPartition");

        cache.addEntry("testFolder", "testId", null);
        expect(cache.getEntry("testFolder", "testId")).toStrictEqual(null);
        expect(Cache.cacheEntrySelector(cache.getPartition().read(), "testFolder", "testId")).toStrictEqual(null);
    })

    test("Cache entry addition and selection works with the public methods 2", () => {
        // Base case
        const store = createStore({});
        const cache = new Cache<null>(store, "testPartition");
        const branch:any[] = []
        const leaf = () => {}

        cache.addEntry(branch, leaf, null);
        expect(cache.getEntry(branch, leaf)).toStrictEqual(null);
        expect(Cache.cacheEntrySelector(cache.getPartition().read(), branch, leaf)).toStrictEqual(null);
    })

    test("Multiple partition re-create over multiple stores", () => {
        // Making sure that the partition data stays integral when re-creation happens across multiple stores and partition

        const store1 = createStore<StateWithCachePartition<null, string>>({});
        const store2 = createStore<StateWithCachePartition<null, string>>({});

        const partition1 = Cache.createDefaultCachePartition<null, string>(store1, "testPartition1");
        const partition2 = Cache.createDefaultCachePartition<null, string>(store1, "testPartition2");
        const partition3 = Cache.createDefaultCachePartition<null, string>(store2, "testPartition1");
        const partition4 = Cache.createDefaultCachePartition<null, string>(store2, "testPartition2");

        partition1.write({ something1: {"a": null}  });
        partition2.write({ something2: {"b": null}  });
        partition3.write({ something3: {"c": null}  });
        partition4.write({ something4: {"d": null}  });

        expect(Cache.createDefaultCachePartition<null, string>(store1, "testPartition1").read()).toStrictEqual({ something1: {"a": null} });
        expect(Cache.createDefaultCachePartition<null, string>(store1, "testPartition1").read()).toStrictEqual({ something1: {"a": null} });
        expect(Cache.createDefaultCachePartition<null, string>(store1, "testPartition2").read()).toStrictEqual({ something2: {"b": null} });
        expect(Cache.createDefaultCachePartition<null, string>(store1, "testPartition2").read()).toStrictEqual({ something2: {"b": null} });
        expect(Cache.createDefaultCachePartition<null, string>(store2, "testPartition1").read()).toStrictEqual({ something3: {"c": null} });
        expect(Cache.createDefaultCachePartition<null, string>(store2, "testPartition1").read()).toStrictEqual({ something3: {"c": null} });
        expect(Cache.createDefaultCachePartition<null, string>(store2, "testPartition2").read()).toStrictEqual({ something4: {"d": null} });
        expect(Cache.createDefaultCachePartition<null, string>(store2, "testPartition2").read()).toStrictEqual({ something4: {"d": null} });
    })
})