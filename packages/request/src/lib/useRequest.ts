import type { Immutable, Store } from "@watchable/store";
import { useSelected } from "@watchable/store-react";
import { Cache, StateWithCachePartition } from "@watchable-react/cache";
import { requestHandler, DEFAULT_REQUEST_CACHE_PARTITION_NAME, defaultRequestResult } from "./requestHandler";
import type { RequestResult } from "../types";

/**
 * A hook for tracking the {@link RequestResult} of a
 * request. It provides a reference to a refresh function.
 * 
 * @param store The [Store](https://watchable.dev/api/interfaces/_watchable_store.Store.html) to use for cacheing.
 * @param requestExecutor the function that returns with the promise of the XHR request.
 * @param currentArgs the arguments the requestExecutor will be called with
 * 
 * @returns a tuple with the current {@link RequestResult} and the reference to a refresh function.
 * Calling this function will do subsequent requests that are cache-managed.
 */
export const useRequest =
    <
        ResolveType,
        ExecutorArgs extends unknown[]
    >
        (
            store: Store<StateWithCachePartition<RequestResult<ResolveType>, string>>,
            requestExecutor: (...args: ExecutorArgs) => Promise<ResolveType>,
            ...currentArgs: ExecutorArgs
        ): [RequestResult<Immutable<ResolveType>>, () => Promise<ResolveType | unknown>] => {

        const cache = new Cache<RequestResult<ResolveType>>(store, DEFAULT_REQUEST_CACHE_PARTITION_NAME);
        const currentValue: RequestResult<Immutable<ResolveType>> = useSelected(cache.getPartition(), (state) => Cache.cacheEntrySelector(state,requestExecutor, currentArgs)) ?? defaultRequestResult;

        const cacheReload = async () => {
            const response: ResolveType | unknown = await requestHandler<ResolveType, ExecutorArgs>(cache, requestExecutor, ...currentArgs);
            return response
        };

        if (currentValue.loadingState === "NEVER_LOADED") {
            void cacheReload();
        }

        return [currentValue, cacheReload];
    };