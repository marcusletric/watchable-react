import { createStorePartition, type Store, type Immutable } from "@watchable/store";
import hash, { NotUndefined } from "object-hash";
import type { CacheKeyType, StateWithCachePartition, CacheFolder } from "../types";


export class Cache<CacheEntryType> {

    private partition: Store<CacheFolder<CacheEntryType, CacheKeyType>>;

    /**
    * Cache instance constructor
    *
    * @param store The {@link @watchable/store!Store} that will be used to hold the cache.
    * @param cachePartitonName name of the partition in which to store the cached records.
    * 
    * @returns {@link @watchable/store!Store} instance of the partition
    */
    constructor(store: Store<StateWithCachePartition<CacheEntryType,CacheKeyType>>,
        cachePartitonName: NotUndefined) {
        this.partition = Cache.createDefaultCachePartition(store, cachePartitonName);
    }

    /**
     * Getter for this Cache instance's store partition
     * @returns {@link @watchable/store!Store} instance of the partition
     */
    public getPartition() {
        return this.partition;
    }

    /**
    * Creates a partition to use as a cache store
    *
    * @param store The {@link @watchable/store!Store} that will be partitioned.
    * @param cachePartitonName name of the partition in which to store the cached records.
    * 
    * @returns {@link @watchable/store!Store} instance of the partition
    */
    static createDefaultCachePartition =
        <CacheEntryType, CachePartitionKey extends CacheKeyType>(
            store: Store<StateWithCachePartition<CacheEntryType,CachePartitionKey>>,
            cachePartitonName: NotUndefined,
        ): Store<StateWithCachePartition<CacheEntryType,CachePartitionKey>[CachePartitionKey]> => {
            const cachePartitionKey = hash(cachePartitonName);
            let partition = createStorePartition<StateWithCachePartition<CacheEntryType,CachePartitionKey>, CachePartitionKey>(store, cachePartitionKey as CachePartitionKey);
            partition.write({ ...partition.read() });
            return partition;
        };

    /**
     * A selector to return a cache partition
     
    * @param state The {@link @watchable/store!PartitionableState} that has the cache partition.
    * @param cachePartitonName The name of the partition where the cache resides.
    */
    static cachePartitionSelector =
        <CacheEntryType>(
            state: StateWithCachePartition<CacheEntryType,CacheKeyType>,
            cachePartitonName: NotUndefined,
        ): CacheFolder<CacheEntryType, CacheKeyType> | undefined => {
            const cachePartitionKey = hash(cachePartitonName);
            return state[cachePartitionKey];
        };

    /**
     * A selector to return a cached entry from the store
     
    * @param state The {@link @watchable/store!PartitionableState} that has the state with cached entries.
    * @param cacheFolder name of the category in which to store the cache records.
    * @param cacheId the identifier of a cached entry.
    */
    static cacheEntrySelector =
        <CacheEntryType>(
            state: CacheFolder<CacheEntryType,CacheKeyType>,
            cacheFolder: NotUndefined,
            cacheId: NotUndefined
        ): CacheEntryType | undefined => {
            const cacheFolderKey: CacheKeyType = hash(cacheFolder);
            const cacheIdKey: CacheKeyType = hash(cacheId);
            return state[cacheFolderKey]?.[cacheIdKey];
        };

    /**
     * Adds an entry to a cache
     
    * @param store The {@link @watchable/store!Store} that contains the cache.
    * @param cachePartitonName The name of the partition where the cache resides.
    * @param cacheFolder name of the category in which to store the cache records.
    * @param cacheId the identifier of a cached entry.
    * @param entry the data to be cached.
    */
    static addEntryToCache =
        <CacheEntryType>(
            store: Store<StateWithCachePartition<CacheEntryType,CacheKeyType>>,
            cachePartitonName: NotUndefined,
            cacheFolder: NotUndefined,
            cacheId: NotUndefined,
            entry: Immutable<CacheEntryType> | undefined
        ): void => {
            if(entry !== undefined) {
                const cachePartitionKey = hash(cachePartitonName);
                const cacheFolderKey = hash(cacheFolder);
                const cacheIdKey = hash(cacheId);
                const cachePartition = createStorePartition(store, cachePartitionKey);
                const folderPartition = createStorePartition(cachePartition, cacheFolderKey);
                const oldState = folderPartition.read();

                folderPartition.write({
                    ...oldState,
                    [cacheIdKey]: entry
                })
            }
        };

    /**
    * Adds an entry to this cache instance
    * @param cacheFolder name of the category in which to store the cache records.
    * @param cacheId the identifier of a cached entry.
    * @param entry the data to be cached.
    */
    public addEntry =
        (
            cacheFolder: NotUndefined,
            cacheId: NotUndefined,
            entry: Immutable<CacheEntryType> | undefined
        ): void => {
            if(entry !== undefined) {
                const cacheFolderKey = hash(cacheFolder);
                const cacheIdKey = hash(cacheId);
                const oldState = this.partition.read();

                this.partition.write({
                    ...oldState,
                    [cacheFolderKey]: {
                        ...oldState[cacheFolderKey],
                        [cacheIdKey]: entry
                    }
                })
            } 
        };

    /**
    * Retrieves an entry from a cache
    * @param store The {@link @watchable/store!Store} that contains the cache.
    * @param cachePartitonName The name of the partition where the cache resides.
    * @param cacheFolder name of the category in which the cached records are stored.
    * @param cacheId the identifier of the cached entry.
    * 
    * @returns type of CacheEntryType generic 
    */
    static getEntryFromCache =
        <CacheEntryType>(
            store: Store<StateWithCachePartition<CacheEntryType,CacheKeyType>>,
            cachePartitonName: NotUndefined,
            cacheFolder: NotUndefined,
            cacheId: NotUndefined
        ): Immutable<CacheEntryType> | undefined => {
            const cachePartitionState = Cache.cachePartitionSelector(store.read(), cachePartitonName);
            return cachePartitionState ? Cache.cacheEntrySelector(cachePartitionState, cacheFolder, cacheId) : undefined;
        };

    /**
    * Retrieves an entry from this cache instance
    * @param cacheFolder name of the category in which the cached records are stored.
    * @param cacheId the identifier of the cached entry.
    * 
    * @returns type of CacheEntryType generic 
    */
    public getEntry =
        (
            cacheFolder: NotUndefined,
            cacheId: NotUndefined
        ): Immutable<CacheEntryType> | undefined => {
            const state = this.partition.read();
            return Cache.cacheEntrySelector(state, cacheFolder, cacheId);
        };

}