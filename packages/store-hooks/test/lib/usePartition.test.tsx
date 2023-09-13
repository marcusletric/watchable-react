import React, { type FC } from "react";
import { render, waitFor, screen, cleanup, act } from "@testing-library/react";
import { createStore, type Immutable, type Selector, type Store, type RootState, type PartitionableState } from "@watchable/store";

import { usePartition } from "../../src/lib/usePartition";
import { describe, test, expect } from "vitest";

describe("usePartition : create, watch and update a partition", () => {

    type TestState = Record<string, object>;

    interface TestComponentProps {
        store: Store<TestState>,
        updateRefGetter?: (updateFn: (newValue: Store<TestState>) => void) => void;
    }


    test("Creates, watches and updates a new partition", async () => {
        const store = createStore<TestState>({} as const);

        const Component: FC<TestComponentProps> = ({ store, updateRefGetter }) => {
            const [value, updateValue] = usePartition<TestState>(store, "partition");
            if (updateRefGetter !== undefined) {
                updateRefGetter(updateValue);
            }
            return <div data-testid="component">{JSON.stringify(value)}</div>;
        };

        let updater: (value: Immutable<PartitionableState<keyof TestState>[keyof TestState]>) => void = (value) => { console.log(value); };
        const updateRefGetter = (updateFn) => { updater = updateFn; };

        render(<Component {...{ store, updateRefGetter }} />);

        expect((await screen.findByTestId("component")).textContent).toBe(
            ""
        );

        updater(1);

        expect((await screen.findByTestId("component")).textContent).toBe(
            "1"
        );

        updater({ "property": "value" });

        expect((await screen.findByTestId("component")).textContent).toBe(
            '{"property":"value"}'
        );
    });
});