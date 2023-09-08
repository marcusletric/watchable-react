"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePartition = void 0;
const store_1 = require("@watchable/store");
const store_react_1 = require("@watchable/store-react");
const react_1 = require("react");
/**
 * A hook for tracking and updating a {@link @watchable/store!PartitionableState}
 * @param store The {@link @watchable/store!Store} to partition.
 * @param partitionKey The key of the store value to use as a partition.
 *
 * @returns a tuple with the current value of the {@link @watchable/store!PartitionableState} and a setter function.
 */
function usePartition(store, partitionKey) {
    // This can be useMemo
    const partitionRef = (0, react_1.useRef)(null);
    if (partitionRef.current === null) {
        partitionRef.current = (0, store_1.createStorePartition)(store, partitionKey);
    }
    const currentValue = partitionRef.current !== null ? (0, store_react_1.useSelected)(partitionRef.current, state => state) : undefined;
    const updateValue = (newValue) => { var _a; return (_a = partitionRef.current) === null || _a === void 0 ? void 0 : _a.write(newValue); };
    return [currentValue, updateValue];
}
exports.usePartition = usePartition;
