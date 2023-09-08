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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequest = void 0;
const store_react_1 = require("@watchable/store-react");
const requestHandler_1 = require("./requestHandler");
const react_1 = require("react");
const object_hash_1 = __importDefault(require("object-hash"));
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
const useRequest = (store, requestExecutor, ...currentArgs) => {
    var _a;
    const cacheFolder = (0, react_1.useMemo)(() => (0, object_hash_1.default)(requestExecutor), [requestExecutor]);
    const cacheId = (0, react_1.useMemo)(() => (0, object_hash_1.default)(currentArgs), [currentArgs]);
    const valueSelector = (cacheId) => (state) => (0, requestHandler_1.cacheEntrySelector)(state, requestHandler_1.DEFAULT_REQUEST_CACHE_PARTITION_NAME, cacheFolder, cacheId);
    const currentValue = (_a = (0, store_react_1.useSelected)(store, valueSelector(cacheId))) !== null && _a !== void 0 ? _a : requestHandler_1.defaultRequestResult;
    const cacheReload = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, requestHandler_1.requestHandler)(requestExecutor(...currentArgs), store, requestHandler_1.DEFAULT_REQUEST_CACHE_PARTITION_NAME, cacheFolder, cacheId);
    });
    if (currentValue.loadingState === "NEVER_LOADED" && cacheFolder !== undefined && currentArgs !== undefined && currentArgs.length > 0) {
        void cacheReload();
    }
    return [currentValue, cacheReload];
};
exports.useRequest = useRequest;
