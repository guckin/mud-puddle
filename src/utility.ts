import {inspect} from 'util';

export type UnaryFn<I, O> = (value: I) => O;

export type UnaryAsyncFn<I, O> = UnaryFn<I, Promise<O>>;

export const compose = <A, B, C>(fn1: UnaryFn<A, B>, fn2: UnaryFn<B, C>): UnaryFn<A, C> => value => fn2(fn1(value));

export const tap = <T>(fn: (value: T) => void) => async (promise: Promise<T>): Promise<T> => {
    const value = await promise;
    fn(value);
    return value;
};

export const log = <T>(value: T): void => {
    const inspected = inspect(value, { depth: null })
    console.log(inspected);
};

export const assertNever = (value: never) => {
    throw new Error(`Unexpected value: ${value}`);
};
