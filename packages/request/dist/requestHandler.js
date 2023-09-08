"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = exports.cacheEntrySelector = exports.cachePartitionSelector = exports.defaultRequestResult = exports.DEFAULT_REQUEST_CACHE_PARTITION_NAME = void 0;
exports.DEFAULT_REQUEST_CACHE_PARTITION_NAME = "____REQUEST_CACHE";
exports.defaultRequestResult = { isLoading: false, loadingState: "NEVER_LOADED" };
/**
 * A selector to return the cache partition from the store
 
 * @param store The {@link @watchable/store!Store} that has the {@link CachePartition}.
 * @param cachePartitonName key of the store where the cache records are held.
 */
const cachePartitionSelector = (state, cachePartitonName
// @ts-expect-error Immutable does not play well with nested records somehow
) => state[cachePartitonName];
exports.cachePartitionSelector = cachePartitionSelector;
/**
 * A selector to return a cached entry from the store
 
 * @param store The {@link @watchable/store!Store} that has the {@link CachePartition}.
 * @param cachePartitonName key of the store where the cache records are held.
 * @param cacheFolder name of the category in which to store the cache records.
 * @param cacheId the identifier of a cached entry.
 */
const cacheEntrySelector = (state, cachePartitonName, cacheFolder, cacheId) => { var _a, _b; return (_b = (_a = (0, exports.cachePartitionSelector)(state, cachePartitonName)) === null || _a === void 0 ? void 0 : _a[cacheFolder]) === null || _b === void 0 ? void 0 : _b[cacheId]; };
exports.cacheEntrySelector = cacheEntrySelector;
/**
 * This function handles XHR requests and caching in a
 * [Store](https://watchable.dev/api/interfaces/_watchable_store.Store.html). It takes a promise and updates the store with a {@link RequestResult}:
 * @param requestPromise The Promise of the request to handle.
 * @param store The [Store](https://watchable.dev/api/interfaces/_watchable_store.Store.html) that has the {@link CachePartition}.
 * @param cachePartitonName key of the store where the cache records are held.
 * @param cacheFolder name of the category in which to store the cache records.
 * @param cacheId the identifier of a cached entry.
 */
const requestHandler = (requestPromise, store, cachePartitonName, cacheFolder, cacheId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const prevStoreState = store.read();
    const entrySelectorShorthand = () => (0, exports.cacheEntrySelector)(prevStoreState, cachePartitonName, cacheFolder, cacheId);
    if (entrySelectorShorthand() === undefined) {
        // When we first do the call, there is no existing object to change
        store.write(Object.assign(Object.assign({}, prevStoreState), { [cachePartitonName]: Object.assign(Object.assign({}, (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)), { [cacheFolder]: Object.assign(Object.assign({}, (_b = (_a = (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)) === null || _a === void 0 ? void 0 : _a[cacheFolder]) !== null && _b !== void 0 ? _b : {}), { [cacheId]: { isLoading: true, loadingState: "LOADING" } }) }) }));
    }
    else {
        store.write(Object.assign(Object.assign({}, prevStoreState), { [cachePartitonName]: Object.assign(Object.assign({}, (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)), { [cacheFolder]: Object.assign(Object.assign({}, (_d = (_c = (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)) === null || _c === void 0 ? void 0 : _c[cacheFolder]) !== null && _d !== void 0 ? _d : {}), { [cacheId]: Object.assign(Object.assign({}, entrySelectorShorthand()), { isLoading: true, loadingState: "LOADING" }) }) }) }));
    }
    try {
        const data = yield requestPromise;
        store.write(Object.assign(Object.assign({}, prevStoreState), { [cachePartitonName]: Object.assign(Object.assign({}, (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)), { [cacheFolder]: Object.assign(Object.assign({}, (_f = (_e = (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)) === null || _e === void 0 ? void 0 : _e[cacheFolder]) !== null && _f !== void 0 ? _f : {}), { [cacheId]: Object.assign(Object.assign({}, entrySelectorShorthand()), { data, isLoading: false, loadingState: "LOADED" }) }) }) }));
        return data;
    }
    catch (error) {
        store.write(Object.assign(Object.assign({}, prevStoreState), { [cachePartitonName]: Object.assign(Object.assign({}, (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)), { [cacheFolder]: Object.assign(Object.assign({}, (_h = (_g = (0, exports.cachePartitionSelector)(prevStoreState, cachePartitonName)) === null || _g === void 0 ? void 0 : _g[cacheFolder]) !== null && _h !== void 0 ? _h : {}), { [cacheId]: Object.assign(Object.assign({}, entrySelectorShorthand()), { error, isLoading: false, loadingState: "ERROR" }) }) }) }));
        return error;
    }
});
exports.requestHandler = requestHandler;
