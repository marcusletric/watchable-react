import { createStore } from "@watchable/store";
import { Cache, StateWithCachePartition } from "@watchable-react/cache";
import { RequestResult } from "../../src";
import { requestHandler } from '../../src/lib';
import { DEFAULT_REQUEST_CACHE_PARTITION_NAME } from "../../src/lib/requestHandler";
import { describe, test, expect } from "vitest";


describe("requestHandler", () => {
    // Happy path
    test("Can handle and store in cache a basic request when the store is prepared", async () => {
        const store = createStore<StateWithCachePartition<RequestResult<number>, string>>({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        const cache = new Cache<RequestResult<number>>(store, DEFAULT_REQUEST_CACHE_PARTITION_NAME);
        const requestFn = async () => await Promise.resolve(1);
        const params:any[] = [];

        await requestHandler<number,string[]>(cache, requestFn, ...params);

        expect(cache.getEntry(requestFn,params)).toStrictEqual({
            data: 1,
            isLoading: false,
            loadingState: 'LOADED',
        });
    });

    // Still happy path
    test("Can handle and store in cache a basic request when there is no cache partition in the store", async () => {
        const store = createStore({});
        const cache = new Cache<RequestResult<number>>(store, DEFAULT_REQUEST_CACHE_PARTITION_NAME);
        const requestFn = async () => await Promise.resolve(1);
        const params:any[] = [];

        await requestHandler<number,string[]>(cache, requestFn, ...params);
        expect(cache.getEntry(requestFn,params)).toStrictEqual({
            data: 1,
            isLoading: false,
            loadingState: 'LOADED',
        });
    });


    // Happy but more convoluted path
    test("Can handle and store in cache multipe basic requests", async () => {
        const store = createStore({});
        const cache = new Cache<RequestResult<number>>(store, DEFAULT_REQUEST_CACHE_PARTITION_NAME);
        const requestFn = async (...params:any[]) => await Promise.resolve(params[params.length-1]);
        const errorFn = async (...params:any[]) => await Promise.reject(new Error(params[params.length-1]));

        
        await requestHandler<number,any[]>(cache, requestFn, "numbers", 1);
        await requestHandler<number,any[]>(cache, requestFn, "numbers", 2);
        await requestHandler<number,any[]>(cache, requestFn, "numbers", 3);
        await requestHandler<number,string[]>(cache, requestFn, "chars", "a");
        await requestHandler<number,string[]>(cache, requestFn, "chars", "b");
        await requestHandler<number,string[]>(cache, requestFn, "chars", "a");
        await requestHandler<number,string[]>(cache, errorFn, "chars", "c");

        expect(cache.getEntry(requestFn,["numbers", 1])).toStrictEqual({
            data: 1,
            isLoading: false,
            loadingState: 'LOADED',
        });

        expect(cache.getEntry(requestFn,["numbers", 2])).toStrictEqual({
            data: 2,
            isLoading: false,
            loadingState: 'LOADED',
        });
        expect(cache.getEntry(requestFn,["numbers", 3])).toStrictEqual({
            data: 3,
            isLoading: false,
            loadingState: 'LOADED',
        });
        expect(cache.getEntry(requestFn,["chars", "a"])).toStrictEqual({
            data: "a",
            isLoading: false,
            loadingState: 'LOADED',
        });
        expect(cache.getEntry(requestFn,["chars", "b"])).toStrictEqual({
            data: "b",
            isLoading: false,
            loadingState: 'LOADED',
        });
        expect(cache.getEntry(requestFn,["chars", "a"])).toStrictEqual({
            data: "a",
            isLoading: false,
            loadingState: 'LOADED',
        });
        expect(cache.getEntry(errorFn,["chars", "c"])).toStrictEqual({
            error: new Error("c"),
            isLoading: false,
            loadingState: 'ERROR',
        });
    });

});