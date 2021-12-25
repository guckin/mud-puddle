export const tap = <T>(fn: (value: T) => void) => async (promise: Promise<T>): Promise<T> => {
    const value = await promise;
    fn(value);
    return value;
};
