
import { Cache } from "@watchable-react/cache";
import type { RequestResult } from "../types";
import { Immutable } from "@watchable/store";

export const DEFAULT_REQUEST_CACHE_PARTITION_NAME = "____REQUEST_CACHE";

export const defaultRequestResult: RequestResult<never> = { isLoading: false, loadingState: "NEVER_LOADED" };

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
    async <ResolveType, ExecutorArgs extends unknown[]>(
        cache: Cache<RequestResult<ResolveType>>,
        requestExecutor: (...args: ExecutorArgs) => Promise<ResolveType>,
        ...requestParams: ExecutorArgs
    ): Promise<ResolveType | unknown> => {
        const entrySelectorShorthand = () => cache.getEntry(requestExecutor, requestParams);

        cache.addEntry(requestExecutor, requestParams, { isLoading: true, loadingState: "LOADING" });

        try {
            const data = await requestExecutor(...requestParams) as Immutable<ResolveType>;
            cache.addEntry(requestExecutor, requestParams, { ...entrySelectorShorthand(), data, isLoading: false, loadingState: "LOADED" });

            return data;
        } catch (error) {
            cache.addEntry(requestExecutor, requestParams, { ...entrySelectorShorthand(), error, isLoading: false, loadingState: "ERROR" });

            return error;
        }
    };