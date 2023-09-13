import { createStore } from "@watchable/store";

import { requestHandler } from '../../src/lib';
import { DEFAULT_REQUEST_CACHE_PARTITION_NAME } from "../../src/lib/requestHandler";
import { describe, test, expect } from "vitest";


describe("requestHandler", () => {
    // Happy path
    test("Can handle and store in cache a basic request when the store is prepared", async () => {
        const store = createStore({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        const requestFn = async () => await Promise.resolve(1);

        await requestHandler(requestFn(), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "numbers", "1");

        expect(store.read()).toStrictEqual({
            [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {
                "numbers": {
                    "1": {
                        data: 1,
                        isLoading: false,
                        loadingState: 'LOADED',
                    },
                }
            }
        });

    });

    // Still happy path
    test("Can handle and store in cache a basic request when there is no cache partition in the store", async () => {
        const store = createStore({});
        const requestFn = async () => await Promise.resolve(1);

        await requestHandler(requestFn(), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "numbers", "1");

        expect(store.read()).toStrictEqual({
            [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {
                "numbers": {
                    "1": {
                        data: 1,
                        isLoading: false,
                        loadingState: 'LOADED',
                    },
                }
            }
        });

    });


    // Happy but more convoluted path
    test("Can handle and store in cache multipe basic requests", async () => {
        const store = createStore({});
        const requestFn = async (param) => await Promise.resolve(param);
        const errorFn = async (param) => await Promise.reject(new Error(param));

        await requestHandler(requestFn(1), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "numbers", "1");
        await requestHandler(requestFn(2), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "numbers", "2");
        await requestHandler(requestFn(3), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "numbers", "3");
        await requestHandler(requestFn("a"), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "chars", "a");
        await requestHandler(requestFn("b"), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "chars", "b");
        await requestHandler(requestFn("c"), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "chars", "a");
        await requestHandler(errorFn("d"), store, DEFAULT_REQUEST_CACHE_PARTITION_NAME, "chars", "c");

        expect(store.read()).toStrictEqual({
            [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {
                "numbers": {
                    "1": {
                        data: 1,
                        isLoading: false,
                        loadingState: 'LOADED',
                    },
                    "2": {
                        data: 2,
                        isLoading: false,
                        loadingState: 'LOADED',
                    },
                    "3": {
                        data: 3,
                        isLoading: false,
                        loadingState: 'LOADED',
                    },
                },
                "chars": {
                    "a": {
                        data: "c",
                        isLoading: false,
                        loadingState: 'LOADED',
                    },
                    "b": {
                        data: "b",
                        isLoading: false,
                        loadingState: 'LOADED',
                    },
                    "c": {
                        error: Error("d"),
                        isLoading: false,
                        loadingState: 'ERROR',
                    },
                }
            }
        });

    });

});