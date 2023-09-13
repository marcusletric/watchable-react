import type { Immutable } from "@watchable/store";
import type { CachePartition, RequestResult, StateWithCachePartition, CacheKeyType, StoreWithCache } from "../types";

export const DEFAULT_REQUEST_CACHE_PARTITION_NAME = "____REQUEST_CACHE";

export const defaultRequestResult: RequestResult<never> = { isLoading: false, loadingState: "NEVER_LOADED" };

/**
 * A selector to return the cache partition from the store
 
 * @param store The {@link @watchable/store!Store} that has the {@link CachePartition}.
 * @param cachePartitonName key of the store where the cache records are held.
 */

export const cachePartitionSelector =
    <StoreSchema, CacheEntryType, CachePartitionKey extends CacheKeyType>
        (
            state: Immutable<StateWithCachePartition<StoreSchema, CacheEntryType, CachePartitionKey>>,
            cachePartitonName: CachePartitionKey
            // @ts-expect-error Immutable does not play well with nested records somehow
        ): Immutable<CachePartition<CacheEntryType>> => state[cachePartitonName];

/**
 * A selector to return a cached entry from the store
 
 * @param store The {@link @watchable/store!Store} that has the {@link CachePartition}.
 * @param cachePartitonName key of the store where the cache records are held.
 * @param cacheFolder name of the category in which to store the cache records.
 * @param cacheId the identifier of a cached entry.
 */

export const cacheEntrySelector =
    <ResolveType, StoreSchema, CachePartitionKey extends string | symbol | number>(
        state: Immutable<StateWithCachePartition<StoreSchema, RequestResult<ResolveType>, CachePartitionKey>>,
        cachePartitonName: CachePartitionKey,
        cacheFolder: string,
        cacheId: CacheKeyType
    ): Immutable<RequestResult<ResolveType>> | undefined => cachePartitionSelector<StoreSchema, RequestResult<ResolveType>, CachePartitionKey>(state, cachePartitonName)?.[cacheFolder]?.[cacheId];

/**
 * This function handles XHR requests and caching in a 
 * [Store](https://watchable.dev/api/interfaces/_watchable_store.Store.html). It takes a promise and updates the store with a {@link RequestResult}:
 * @param requestPromise The Promise of the request to handle.
 * @param store The [Store](https://watchable.dev/api/interfaces/_watchable_store.Store.html) that has the {@link CachePartition}.
 * @param cachePartitonName key of the store where the cache records are held.
 * @param cacheFolder name of the category in which to store the cache records.
 * @param cacheId the identifier of a cached entry.
 */

export const requestHandler =
    async <StoreSchema extends object, ResolveType, CachePartitionKey extends string | symbol | number>(
        requestPromise: Promise<ResolveType>,
        store: StoreWithCache<StoreSchema, RequestResult<ResolveType>, CachePartitionKey>,
        cachePartitonName: CachePartitionKey,
        cacheFolder: string, cacheId: string
    ): Promise<ResolveType | unknown> => {
        const prevStoreState = store.read();
        const entrySelectorShorthand = () => cacheEntrySelector(prevStoreState, cachePartitonName, cacheFolder, cacheId);

        if (entrySelectorShorthand() === undefined) {
            // When we first do the call, there is no existing object to change
            store.write({
                ...prevStoreState,
                [cachePartitonName]: {
                    ...cachePartitionSelector(prevStoreState, cachePartitonName),
                    [cacheFolder]: {
                        ...cachePartitionSelector(prevStoreState, cachePartitonName)?.[cacheFolder] ?? {},
                        [cacheId]: { isLoading: true, loadingState: "LOADING" }
                    }
                }
            });
        } else {
            store.write({
                ...prevStoreState,
                [cachePartitonName]: {
                    ...cachePartitionSelector(prevStoreState, cachePartitonName),
                    [cacheFolder]: {
                        ...cachePartitionSelector(prevStoreState, cachePartitonName)?.[cacheFolder] ?? {},
                        [cacheId]: { ...entrySelectorShorthand(), isLoading: true, loadingState: "LOADING" }
                    }
                }
            });
        }


        try {
            const data = await requestPromise;

            store.write({
                ...prevStoreState,
                [cachePartitonName]: {
                    ...cachePartitionSelector(prevStoreState, cachePartitonName),
                    [cacheFolder]: {
                        ...cachePartitionSelector(prevStoreState, cachePartitonName)?.[cacheFolder] ?? {},
                        [cacheId]: { ...entrySelectorShorthand(), data, isLoading: false, loadingState: "LOADED" }
                    }
                }
            });

            return data;
        } catch (error) {
            store.write({
                ...prevStoreState,
                [cachePartitonName]: {
                    ...cachePartitionSelector(prevStoreState, cachePartitonName),
                    [cacheFolder]: {
                        ...cachePartitionSelector(prevStoreState, cachePartitonName)?.[cacheFolder] ?? {},
                        [cacheId]: { ...entrySelectorShorthand(), error, isLoading: false, loadingState: "ERROR" }
                    }
                }
            });

            return error;
        }
    };