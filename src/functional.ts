import {TwoOrMore} from './array';

export type UnaryFn<I, O> = (value: I) => O;

export type UnaryAsyncFn<I, O> = UnaryFn<I, Promise<O>>;

export function compose<A, B, C>(fn1: UnaryFn<A, B>, fn2: UnaryFn<B, C>): UnaryFn<A, C>;
export function compose<A, B, C, D>(fn1: UnaryFn<A, B>, fn2: UnaryFn<B, C>, fn3: UnaryFn <C, D>): UnaryFn<A, D>;
export function compose(...fns: TwoOrMore<UnaryFn<unknown, unknown>>): UnaryFn<unknown, unknown> {
    return value => fns.reduce((prev: unknown, fn: UnaryFn<unknown, unknown>) => fn(prev), value);
}
