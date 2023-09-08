/**
 * LOADING_STATE represents the 4 basic states a request handling could be in
 */
export type LOADING_STATE = "NEVER_LOADED" | "LOADING" | "LOADED" | "ERROR";

/**
 * RequestResult<ResolveType, Error = unknown> is a dynamic structure that holds data and state of a request
 * isLoading: boolean (if the request is waiting for a response from the server)
 * loadingState: {@link LOADING_STATE}
 * data?: ResolveType (previously loaded data)
 * error?: Error (previously caught error)
 */
export type RequestResult<ResolveType, Error = unknown> =
    // Has been never loaded
    {
        isLoading: false;
        loadingState: Extract<LOADING_STATE, "NEVER_LOADED">;
    }
    |// Loading in progress, might have previous data
    {
        isLoading: true;
        loadingState: Extract<LOADING_STATE, "LOADING">;
        data?: ResolveType | null;
        error?: Error
    }
    // retrieval failed - loading===false, has errors
    | {
        isLoading: false;
        loadingState: Extract<LOADING_STATE, "ERROR">;
        error: Error;
    }
    // retrieval succeeded - loading===false, has data
    | {
        isLoading: false;
        loadingState: Extract<LOADING_STATE, "LOADED">;
        data: ResolveType;
    };
