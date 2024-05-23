import type { Store, RootState, PartitionableState } from "@watchable/store";
import { createStore, createStorePartition } from "@watchable/store";
import { useMemo } from "react";
import { Path } from "../types"

/**
 * A hook for tracking and updating a {@link @watchable/store!PartitionableState}
 * @param store The {@link @watchable/store!Store} to partition.
 * @param partitionPath The path of the state to use as a partition.
 * 
 * @returns a tuple with the current value of the {@link @watchable/store!PartitionableState} and a setter function.
 */
export function usePartition<State extends RootState>
    (
        store: Store<PartitionableState<keyof State>>,
        partitionKey: string | symbol | number,
    ):
    Store<State> {

    const parentStore = useMemo<Store<PartitionableState<keyof State>[any]>>(() => createStore(store.read()), [])
    const partition = useMemo<Store<PartitionableState<keyof State>[any]>>(() => createStorePartition(parentStore, partitionKey), []);

    return partition;
}