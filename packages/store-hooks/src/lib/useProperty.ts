import { type Immutable, type Store } from "@watchable/store";
import { useSelected } from "@watchable/store-react";
import { useCallback } from "react";


/**
 * A hook for tracking and updating a property in the state
 * @param store The {@link @watchable/store!Store} to read the state from.
 * @param key The key of the state value to track.
 * 
 * @returns a tuple with the current value of the state property and a setter function.
 */
export function useProperty<
    StateType extends Record<PropertyKey, unknown>,
>(store: Store<StateType>, key: keyof StateType) {
    const selector = useCallback((state: Immutable<StateType>) => state[key], [key]);
    
    const valueSetter = useCallback(
        (value: StateType[keyof StateType]) => {
            store.write({
                ...store.read(),
                [key]: value,
            });
        },
        [store, key]
    );

    if(selector(store.read()) === undefined) {
        store.write({
            ...store.read(),
            [key]: null,
        });
    }

    const value = useSelected(store, selector);
    return [value, valueSetter] as const;
}