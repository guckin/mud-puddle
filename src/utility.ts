import {inspect} from 'util';

export type UnaryFn<I, O> = (value: I) => O;

export type UnaryAsyncFn<I, O> = UnaryFn<I, Promise<O>>;

export function compose<A, B, C>(fn1: UnaryFn<A, B>, fn2: UnaryFn<B, C>): UnaryFn<A, C>;

export function compose<A, B, C, D>(fn1: UnaryFn<A, B>, fn2: UnaryFn<B, C>, fn3: UnaryFn <C, D>): UnaryFn<A, D>;

export function compose(...fns: ArraySize2Plus<UnaryFn<unknown, unknown>>): UnaryFn<unknown, unknown> {
    return value => fns.reduce((prev: unknown, fn: UnaryFn<unknown, unknown>) => fn(prev), value);
}

export type ArraySize2Plus<T> = [T, T, ...Array<T>];

export const tap = <T>(fn: (value: T) => void) => async (promise: Promise<T>): Promise<T> => {
    const value = await promise;
    fn(value);
    return value;
};

export const log = <T>(value: T): T => {
    const inspected = inspect(value, { depth: null })
    console.log(inspected);
    return value;
};

export const assertNever = (value: never) => {
    throw new Error(`Unexpected value: ${value}`);
};
