import React, { type FC } from "react";
import { render, screen} from "@testing-library/react";
import { createStore, type Store } from "@watchable/store";

import { describe, test, expect } from "vitest";
import { useProperty } from "../../src";

describe("useProperty : create, watch and update a partition", () => {

    type TestState = Record<string, unknown>;

    interface TestComponentProps {
        store: Store<TestState>,
        updateRefGetter?: (updateFn: (newValue: TestState[keyof TestState]) => void) => void;
    }


    test("Watches and updates a property in a state", async () => {
        const store = createStore<TestState>({} as const);

        const Component: FC<TestComponentProps> = ({ store, updateRefGetter }) => {
            const [value, updateValue] = useProperty<TestState>(store, "partition");
            if (updateRefGetter !== undefined) {
                updateRefGetter(updateValue);
            }
            return <div data-testid="component">{JSON.stringify(value)}</div>;
        };

        let updater: (newValue: TestState[keyof TestState]) => void = () => console.log("unassigned updater");
        const updateRefGetter = (updateFn: (newValue: TestState[keyof TestState]) => void) => { updater = updateFn; };

        render(<Component {...{ store, updateRefGetter }} />);

        expect((await screen.findByTestId("component")).textContent).toBe(
            "null"
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