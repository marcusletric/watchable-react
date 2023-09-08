import type { Store, Immutable, RootState, PartitionableState } from "@watchable/store";
import { createStorePartition } from "@watchable/store";
import { useSelected } from "@watchable/store-react";
import { useRef } from "react";

/**
 * A hook for tracking and updating a {@link @watchable/store!PartitionableState}
 * @param store The {@link @watchable/store!Store} to partition.
 * @param partitionKey The key of the store value to use as a partition.
 * 
 * @returns a tuple with the current value of the {@link @watchable/store!PartitionableState} and a setter function.
 */
export function usePartition<State extends RootState>(store: Store<PartitionableState<keyof State>>, partitionKey: keyof State): [Immutable<PartitionableState<keyof State>[keyof State]> | undefined, (newValue: Immutable<PartitionableState<keyof State>[keyof State]>) => void] {
    // This can be useMemo
    const partitionRef = useRef<Store<PartitionableState<keyof State>[keyof State]> | null>(null);

    if (partitionRef.current === null) {
        partitionRef.current = createStorePartition(store, partitionKey);
    }

    const currentValue = partitionRef.current !== null ? useSelected(partitionRef.current, state => state) : undefined;
    const updateValue = (newValue: Immutable<PartitionableState<keyof State>[keyof State]>) => partitionRef.current?.write(newValue);

    return [currentValue, updateValue];
}