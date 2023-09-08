import mockResponses from "./mockResponses.json";
let counter = 0;
let delay = 0;

export const mockRequest = async (...args) => {
    return await new Promise((resolve, reject) => {
        if (mockResponses[args[0]] !== undefined) {
            if (args[0] !== "refreshable") {
                setTimeout(() => {
                    resolve(mockResponses[args[0]]);
                }, delay);
            } else {
                setTimeout(() => {
                    resolve(mockResponses.refreshable[counter % mockResponses.refreshable.length]);
                    counter++;
                }, delay);
            }

        } else {
            setTimeout(() => {
                reject(new Error("No such mock response is available"));
            }, delay);
        };
    });
};


export const resetRequestMock = () => { counter = 0; delay = 0; };
export const setResponseDelay = (newDelay: number) => { delay = newDelay; };