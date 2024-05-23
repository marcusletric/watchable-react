import mockResponses from "./mockResponses.json";
let counter = 0;
let delay = 0;

export const mockRequest: (...args:any[]) => Promise<any> = async (...args: any[]) => {
    return await new Promise((resolve, reject) => {
        const mockResponse: any = (mockResponses as any)[args[0]];
        if (mockResponse !== undefined ) {
            if (args[0] !== "refreshable") {
                setTimeout(() => {
                    resolve(mockResponse);
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