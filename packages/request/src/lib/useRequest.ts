import type { Immutable, Selector } from "@watchable/store";
import { useSelected } from "@watchable/store-react";
import { cacheEntrySelector, requestHandler, DEFAULT_REQUEST_CACHE_PARTITION_NAME, defaultRequestResult } from "./requestHandler";
import type { RequestResult, StoreWithCache, StateWithCachePartition } from "../types";
import { useMemo } from "react";
import hash from "object-hash";

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
        StoreSchema extends object,
        ExecutorArgs extends unknown[]
    >
        (
            store: StoreWithCache<StoreSchema, RequestResult<ResolveType>, typeof DEFAULT_REQUEST_CACHE_PARTITION_NAME>,
            requestExecutor: (...args: ExecutorArgs) => Promise<ResolveType>,
            ...currentArgs: ExecutorArgs
        ): [RequestResult<Immutable<ResolveType>>, (...args: ExecutorArgs) => Promise<ResolveType | unknown>] => {
        const cacheFolder = useMemo(() => hash(requestExecutor), [requestExecutor]);
        const cacheId = useMemo(() => hash(currentArgs), [currentArgs]);

        const valueSelector =
            (cacheId: string): Selector<StateWithCachePartition<StoreSchema, RequestResult<ResolveType>, typeof DEFAULT_REQUEST_CACHE_PARTITION_NAME>, RequestResult<Immutable<ResolveType>> | undefined> =>
                (state) => cacheEntrySelector<ResolveType, StoreSchema, typeof DEFAULT_REQUEST_CACHE_PARTITION_NAME>(
                    state,
                    DEFAULT_REQUEST_CACHE_PARTITION_NAME,
                    cacheFolder,
                    cacheId
                );

        const currentValue: RequestResult<Immutable<ResolveType>> = useSelected<StateWithCachePartition<StoreSchema, RequestResult<ResolveType>, typeof DEFAULT_REQUEST_CACHE_PARTITION_NAME>, RequestResult<Immutable<ResolveType>> | undefined>(store, valueSelector(cacheId)) ?? defaultRequestResult;


        const cacheReload = async () => {
            return await requestHandler<StoreSchema, ResolveType, typeof DEFAULT_REQUEST_CACHE_PARTITION_NAME>(requestExecutor(...currentArgs), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, cacheFolder, cacheId);
        };

        if (currentValue.loadingState === "NEVER_LOADED" && cacheFolder !== undefined && currentArgs !== undefined && currentArgs.length > 0) {
            void cacheReload();
        }

        return [currentValue, cacheReload];
    };