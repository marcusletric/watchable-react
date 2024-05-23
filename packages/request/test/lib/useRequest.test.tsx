import React, { useState, type FC, type Dispatch, type SetStateAction } from 'react';
import { createStore, Store } from "@watchable/store";
import { StateWithCachePartition } from "@watchable-react/cache";
import { vi, describe, test, expect, afterEach } from "vitest";
import { render, screen, waitFor, cleanup as renderCleanup } from '@testing-library/react';
import { useRequest } from '../../src/lib';
import type { RequestResult } from "../../src/types";
import { mockRequest, resetRequestMock, setResponseDelay } from '../mocks/mockRequest';
import mockResponses from '../mocks/mockResponses.json';


interface TestComponentProps {
    store: Store<StateWithCachePartition<RequestResult<any>, string>>,
    requestFn: (...args: unknown[]) => Promise<unknown>;
    refreshCallbackGetter?: (refreshFn: (...args: unknown[]) => Promise<unknown>) => void;
    hookArgsSetterGetter?: (setterFn: Dispatch<SetStateAction<unknown[]>>) => void;
    defaultArgs?: unknown[];
}


// Creating a test component that has the hook's arguments in a state. 
// The hookArgsSetterGetter prop will expose it's state setter reference that can be called for a controlled re-render
// < Getter of the hook arguments setter function's reference > you get it, right? :D
// The refreshCallbackGetter prop will expose the refreshFn returned by the hook in the tuple

const TestComponent: FC<TestComponentProps> = ({ store, requestFn, refreshCallbackGetter, hookArgsSetterGetter, defaultArgs }) => {
    const [hookArgs, setHookArgs] = useState<unknown[]>(defaultArgs || []);
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

interface TestComponent2Props {
    store: Store<StateWithCachePartition<RequestResult<any>, string>>,
    requestFn1: (...args: unknown[]) => Promise<unknown>;
    requestFn2: (...args: unknown[]) => Promise<unknown>;
    refreshCallbackGetter1?: (refreshFn: (...args: unknown[]) => Promise<unknown>) => void;
    refreshCallbackGetter2?: (refreshFn: (...args: unknown[]) => Promise<unknown>) => void;
    hookArgsSetterGetter1?: (setterFn: Dispatch<SetStateAction<unknown[]>>) => void;
    hookArgsSetterGetter2?: (setterFn: Dispatch<SetStateAction<unknown[]>>) => void;
    defaultArgs1?: unknown[];
    defaultArgs2?: unknown[];
}

const TestComponent2: FC<TestComponent2Props> = ({ store, requestFn1, requestFn2, refreshCallbackGetter1, refreshCallbackGetter2, hookArgsSetterGetter1, hookArgsSetterGetter2, defaultArgs1, defaultArgs2 }) => {
    const [hookArgs1, setHookArgs1] = useState<unknown[]>(defaultArgs1 || []);
    const [hookArgs2, setHookArgs2] = useState<unknown[]>(defaultArgs2 || []);
    
    const [result1, refreshFn1] = useRequest(store, requestFn1, ...hookArgs1);
    const [result2, refreshFn2] = useRequest(store, requestFn2, ...hookArgs2);

    if (refreshCallbackGetter1 !== undefined) {
        refreshCallbackGetter1(refreshFn1);
    }

    if (hookArgsSetterGetter1 !== undefined) {
        hookArgsSetterGetter1(setHookArgs1);
    }

    if (refreshCallbackGetter2 !== undefined) {
        refreshCallbackGetter2(refreshFn2);
    }

    if (hookArgsSetterGetter2 !== undefined) {
        hookArgsSetterGetter2(setHookArgs2);
    }

    let data1, error1, data2, error2;
    if (result1.loadingState === 'LOADED') {
        data1 = result1.data;
    }

    if (result1.loadingState === 'ERROR') {
        error1 = result1.error;
    }

    if (result2.loadingState === 'LOADED') {
        data2 = result2.data;
    }

    if (result2.loadingState === 'ERROR') {
        error2 = result2.error;
    }

    return <div>
        <div data-testid="data1">{JSON.stringify(data1)}</div>
        <div data-testid="loadingState1">{result1.loadingState}</div>
        <div data-testid="isLoading1">{result1.isLoading ? "true" : "false"}</div>
        <div data-testid="error1">{error1 !== undefined && error1 !== null ? JSON.stringify(error1, Object.getOwnPropertyNames(error1)) : ""}</div>
        <div data-testid="data2">{JSON.stringify(data2)}</div>
        <div data-testid="loadingState2">{result2.loadingState}</div>
        <div data-testid="isLoading2">{result2.isLoading ? "true" : "false"}</div>
        <div data-testid="error2">{error2 !== undefined && error2 !== null ? JSON.stringify(error2, Object.getOwnPropertyNames(error2)) : ""}</div>
    </div>;
}

describe("useRequest hook", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        renderCleanup();
        resetRequestMock();
    });

    test("Minimum viable product", async () => {
        const store = createStore({});
        let hookArgsSetter = (...args: any[]) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn: Dispatch<SetStateAction<unknown[]>>) => { hookArgsSetter = setterFn; };

        render(<TestComponent requestFn={mockRequest} {...{ store, hookArgsSetterGetter }} />);

        hookArgsSetter([1]);

        await waitFor(() => {
            expect(screen.getByTestId("data").textContent).toBe("1");
        });
    });

    test("Handles request states properly", async () => {
        const store = createStore({});
        let refreshCallback = () => { };
        const refreshCallbackGetter = (refreshFn: () => void) => { refreshCallback = refreshFn; };

        setResponseDelay(10);
        
        render(<TestComponent requestFn={mockRequest} {...{ store, refreshCallbackGetter, defaultArgs:[1] }} />);

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
        const store = createStore({});
        const spyObject = { mockRequest };
        const requestSpy = vi.spyOn(spyObject, 'mockRequest');

        let hookArgsSetter = (...args: any[]) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn: Dispatch<SetStateAction<unknown[]>>) => { hookArgsSetter = setterFn; };

        render(<TestComponent requestFn={spyObject.mockRequest} {...{ store, hookArgsSetterGetter, defaultArgs:[1] }} />);

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
        const store = createStore({});
        let refreshCallback = () => { };
        let hookArgsSetter = (...args: any[]) => { console.log(...args); };
        const refreshCallbackGetter = (refreshFn: () => void) => { refreshCallback = refreshFn; };
        const hookArgsSetterGetter = (setterFn: Dispatch<SetStateAction<unknown[]>>) => { hookArgsSetter = setterFn; };
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

        // Initial render, first + last 2 argument changes
        expect(requestSpy).toHaveBeenCalledTimes(4);

    });

    test("Handles multiple parameters", async () => {
        const store = createStore({});
        const spyObject = { mockRequest };
        const requestSpy = vi.spyOn(spyObject, 'mockRequest');

        let hookArgsSetter = (...args: any[]) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn: Dispatch<SetStateAction<unknown[]>>) => { hookArgsSetter = setterFn; };


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

        // Initial render and two distinct parameter sets
        expect(requestSpy).toHaveBeenCalledTimes(3);

    });

    test("Handles errors gracefully", async () => {
        const store = createStore({});
        const spyObject = { mockRequest };
        const requestSpy = vi.spyOn(spyObject, 'mockRequest');

        let hookArgsSetter = (...args: any[]) => { console.log(...args); };
        const hookArgsSetterGetter = (setterFn: Dispatch<SetStateAction<unknown[]>>) => { hookArgsSetter = setterFn; };


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


        expect(requestSpy).toHaveBeenCalledTimes(2);

    });

    test("Handles multiple parallel requests, cache and prop updates", async () => {
        const store = createStore({});
        const spyObject = { mockRequest1: mockRequest, mockRequest2: mockRequest };
        let refreshCallback1 = () => { };
        let refreshCallback2 = () => { };
        let hookArgsSetter1 = (...args: any[]) => { console.log(...args); };
        let hookArgsSetter2 = (...args: any[]) => { console.log(...args); };
        const refreshCallbackGetter1 = (refreshFn: () => void) => { refreshCallback1 = refreshFn; };
        const refreshCallbackGetter2 = (refreshFn: () => void) => { refreshCallback2 = refreshFn; };
        const hookArgsSetterGetter1 = (setterFn: Dispatch<SetStateAction<unknown[]>>) => { hookArgsSetter1 = setterFn; };
        const hookArgsSetterGetter2 = (setterFn: Dispatch<SetStateAction<unknown[]>>) => { hookArgsSetter2 = setterFn; };
        const requestSpy1 = vi.spyOn(spyObject, 'mockRequest1');
        const requestSpy2 = vi.spyOn(spyObject, 'mockRequest2');
        
        setResponseDelay(10);
        
        render(<TestComponent2 
            requestFn1={spyObject.mockRequest1} 
            requestFn2={spyObject.mockRequest2} 
            {...{ 
                store, 
                refreshCallbackGetter1, 
                refreshCallbackGetter2, 
                hookArgsSetterGetter1, 
                hookArgsSetterGetter2, 
                defaultArgs1:[1],
                defaultArgs2:[2],
            }
        } />);

        await waitFor(() => {
            expect(screen.getByTestId("data1").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("data2").textContent).toBe('"2"');
        });

        expect(requestSpy1).toHaveBeenCalledTimes(1);
        expect(requestSpy2).toHaveBeenCalledTimes(1);

        hookArgsSetter1([1]);

        await waitFor(() => {
            expect(screen.getByTestId("data1").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("data2").textContent).toBe('"2"');
        });

        expect(requestSpy1).toHaveBeenCalledTimes(1);
        expect(requestSpy2).toHaveBeenCalledTimes(1);

        hookArgsSetter1([1]);
        hookArgsSetter2([2]);

        await waitFor(() => {
            expect(screen.getByTestId("data1").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("data2").textContent).toBe('"2"');
        });

        expect(requestSpy1).toHaveBeenCalledTimes(1);
        expect(requestSpy2).toHaveBeenCalledTimes(1);

        hookArgsSetter1([1]);
        hookArgsSetter2([3]);

        await waitFor(() => {
            expect(screen.getByTestId("data1").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("data2").textContent).toBe(JSON.stringify(mockResponses[3]));
        });

        expect(requestSpy1).toHaveBeenCalledTimes(1);
        expect(requestSpy2).toHaveBeenCalledTimes(2);

        hookArgsSetter1([1]);
        hookArgsSetter2([3]);

        await waitFor(() => {
            expect(screen.getByTestId("data1").textContent).toBe("1");
        });
        await waitFor(() => {
            expect(screen.getByTestId("data2").textContent).toBe(JSON.stringify(mockResponses[3]));
        });

        expect(requestSpy1).toHaveBeenCalledTimes(1);
        expect(requestSpy2).toHaveBeenCalledTimes(2);

        hookArgsSetter1(["refreshable"]);
        hookArgsSetter2([4]);

        await waitFor(() => {
            expect(screen.getByTestId("data1").textContent).toBe(JSON.stringify(mockResponses.refreshable[0]));
        });
        await waitFor(() => {
            expect(screen.getByTestId("data2").textContent).toBe(JSON.stringify(mockResponses[4]));
        });

        expect(requestSpy1).toHaveBeenCalledTimes(2);
        expect(requestSpy2).toHaveBeenCalledTimes(3);

        refreshCallback1();
        refreshCallback1();

        await waitFor(() => {
            expect(screen.getByTestId("data1").textContent).toBe(JSON.stringify(mockResponses.refreshable[2]));
        });
        await waitFor(() => {
            expect(screen.getByTestId("data2").textContent).toBe(JSON.stringify(mockResponses[4]));
        });

        expect(requestSpy1).toHaveBeenCalledTimes(4);
        expect(requestSpy2).toHaveBeenCalledTimes(3);
    })
});