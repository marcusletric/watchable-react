import React, { useState, type FC, type Dispatch, type SetStateAction } from 'react';
import { createStore } from "@watchable/store";
import { vi, describe, test, expect, afterEach } from "vitest";
import { render, screen, waitFor, cleanup as renderCleanup } from '@testing-library/react';
import { useRequest } from '../../lib';
import type { RequestResult, StoreWithCache } from "../../types";
import { mockRequest, resetRequestMock, setResponseDelay } from '../mocks/mockRequest';
import mockResponses from '../mocks/mockResponses.json';
import { DEFAULT_REQUEST_CACHE_PARTITION_NAME } from '../../lib/requestHandler';


interface TestComponentProps {
    store: StoreWithCache<Record<string, unknown>, RequestResult<any>, typeof DEFAULT_REQUEST_CACHE_PARTITION_NAME>;
    requestFn: (...args: unknown[]) => Promise<unknown>;
    refreshCallbackGetter?: (refreshFn: (...args: unknown[]) => Promise<unknown>) => void;
    hookArgsSetterGetter?: (setterFn: Dispatch<SetStateAction<unknown[]>>) => void;
}


// Creating a test component that has the hook's arguments in a state. 
// The hookArgsSetterGetter prop will expose it's state setter reference that can be called for a controlled re-render
// < Getter of the hook arguments setter function's reference > you get it, right? :D
// The refreshCallbackGetter prop will expose the refreshFn returned by the hook in the tuple

const TestComponent: FC<TestComponentProps> = ({ store, requestFn, refreshCallbackGetter, hookArgsSetterGetter }) => {
    const [hookArgs, setHookArgs] = useState<unknown[]>([]);
    const [result, refreshFn] = useRequest(store, requestFn, ...hookArgs);

    let data, error;

    if (refreshCallbackGetter !== undefined) {
        refreshCallbackGetter(refreshFn);
    }

    if (hookArgsSetterGetter !== undefined) {
        hookArgsSetterGetter(setHookArgs);
    }

    if (result.loadingState === 'LOADED') {
        data = result.data;
    }

    if (result.loadingState === 'ERROR') {
        error = result.error;
    }

    return <div>
        <div data-testid="data">{JSON.stringify(data)}</div>
        <div data-testid="loadingState">{result.loadingState}</div>
        <div data-testid="isLoading">{result.isLoading ? "true" : "false"}</div>
        <div data-testid="error">{error !== undefined && error !== null ? JSON.stringify(error, Object.getOwnPropertyNames(error)) : ""}</div>
    </div>;
};

describe("useRequest hook", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        renderCleanup();
        resetRequestMock();
    });

    test("Minimum viable product", async () => {
        const store = createStore({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        let hookArgsSetter = (...args) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn) => { hookArgsSetter = setterFn; };

        render(<TestComponent requestFn={mockRequest} {...{ store, hookArgsSetterGetter }} />);

        hookArgsSetter([1]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });
    });

    test("Handles request states properly", async () => {
        const store = createStore({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        let refreshCallback = () => { };
        let hookArgsSetter = (...args) => { console.log(...args); };
        const refreshCallbackGetter = (refreshFn) => { refreshCallback = refreshFn; };
        const hookArgsSetterGetter = (setterFn) => { hookArgsSetter = setterFn; };

        setResponseDelay(10);

        render(<TestComponent requestFn={mockRequest} {...{ store, refreshCallbackGetter, hookArgsSetterGetter }} />);


        // First time load never requested
        expect(screen.getByTestId("data").textContent).toBe("");
        expect(screen.getByTestId("loadingState").textContent).toBe("NEVER_LOADED");
        expect(screen.getByTestId("isLoading").textContent).toBe("false");
        expect(screen.getByTestId("error").textContent).toBe("");

        hookArgsSetter([1]);

        // First time load request in progress
        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("");
        });
        await waitFor(() => {
            expect(screen.getByTestId("loadingState").textContent).toBe("LOADING");
        });
        await waitFor(() => {
            expect(screen.getByTestId("isLoading").textContent).toBe("true");
        });
        await waitFor(() => {
            expect(screen.getByTestId("error").textContent).toBe("");
        });

        // Request resolved
        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("loadingState").textContent).toBe("LOADED");
        });
        await waitFor(() => {
            expect(screen.getByTestId("isLoading").textContent).toBe("false");
        });
        await waitFor(() => {
            expect(screen.getByTestId("error").textContent).toBe("");
        });

        // Calling the refresh function goes trough the loading state again
        refreshCallback();

        // Refresh load request in progress
        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("loadingState").textContent).toBe("LOADING");
        });
        await waitFor(() => {
            expect(screen.getByTestId("isLoading").textContent).toBe("true");
        });
        await waitFor(() => {
            expect(screen.getByTestId("error").textContent).toBe("");
        });

        // Request resolved
        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("loadingState").textContent).toBe("LOADED");
        });
        await waitFor(() => {
            expect(screen.getByTestId("isLoading").textContent).toBe("false");
        });
        await waitFor(() => {
            expect(screen.getByTestId("error").textContent).toBe("");
        });
    });

    test("Returns cached value on multiple renders", async () => {
        const store = createStore({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        const spyObject = { mockRequest };
        const requestSpy = vi.spyOn(spyObject, 'mockRequest');

        let hookArgsSetter = (...args) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn) => { hookArgsSetter = setterFn; };

        render(<TestComponent requestFn={spyObject.mockRequest} {...{ store, hookArgsSetterGetter }} />);

        hookArgsSetter([1]);

        // Testing for argument 1
        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });

        hookArgsSetter([1]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });

        hookArgsSetter([1]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });

        // Testing for argument 2
        hookArgsSetter([2]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe(`"2"`);
        });

        // Back to argument 1
        hookArgsSetter([1]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });

        // Check cache integrity for argument 2
        hookArgsSetter([2]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe(`"2"`);
        });



        // 6 renders should have caused 2 request calls
        expect(requestSpy).toHaveBeenCalledTimes(2);

    });

    test("Returns cached value until refresh is called", async () => {
        const store = createStore({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        let refreshCallback = () => { };
        let hookArgsSetter = (...args) => { console.log(...args); };
        const refreshCallbackGetter = (refreshFn) => { refreshCallback = refreshFn; };
        const hookArgsSetterGetter = (setterFn) => { hookArgsSetter = setterFn; };
        const spyObject = { mockRequest };
        const requestSpy = vi.spyOn(spyObject, 'mockRequest');


        // Using mock API that can return different data between calls 
        render(<TestComponent requestFn={spyObject.mockRequest} {...{ store, refreshCallbackGetter, hookArgsSetterGetter }} />);

        hookArgsSetter(["refreshable"]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe(JSON.stringify(mockResponses.refreshable[0]));
        });

        hookArgsSetter(["refreshable"]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe(JSON.stringify(mockResponses.refreshable[0]));
        });

        hookArgsSetter(["refreshable"]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe(JSON.stringify(mockResponses.refreshable[0]));
        });

        // Calling the cache refresh function to get new data
        refreshCallback();

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe(JSON.stringify(mockResponses.refreshable[1]));
        });

        refreshCallback();

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe(JSON.stringify(mockResponses.refreshable[2]));
        });


        expect(requestSpy).toHaveBeenCalledTimes(3);

    });

    test("Handles multiple parameters", async () => {
        const store = createStore({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        const spyObject = { mockRequest };
        const requestSpy = vi.spyOn(spyObject, 'mockRequest');

        let hookArgsSetter = (...args) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn) => { hookArgsSetter = setterFn; };


        render(<TestComponent requestFn={spyObject.mockRequest} {...{ store, hookArgsSetterGetter }} />);

        hookArgsSetter([1, 2, 3]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });

        hookArgsSetter([1, 2, 4]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });

        // Testing if same set of parameters are returned from cache
        hookArgsSetter([1, 2, 3]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });

        expect(requestSpy).toHaveBeenCalledTimes(2);

    });

    test("Handles errors gracefully", async () => {
        const store = createStore({ [DEFAULT_REQUEST_CACHE_PARTITION_NAME]: {} });
        const spyObject = { mockRequest };
        const requestSpy = vi.spyOn(spyObject, 'mockRequest');

        let hookArgsSetter = (...args) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn) => { hookArgsSetter = setterFn; };


        render(<TestComponent requestFn={spyObject.mockRequest} {...{ store, hookArgsSetterGetter }} />);

        hookArgsSetter(["whatever"]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("");
        });
        await waitFor(() => {
            expect(screen.getByTestId("loadingState").textContent).toBe("ERROR");
        });
        await waitFor(() => {
            expect(screen.getByTestId("isLoading").textContent).toBe("false");
        });
        await waitFor(() => {
            expect(screen.getByText(/No such mock response is available/i)).not.toBeUndefined();
        });


        expect(requestSpy).toHaveBeenCalledTimes(1);

    });
});