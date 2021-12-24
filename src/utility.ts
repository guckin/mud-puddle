import {inspect} from 'util';

export type UnaryFn<I, O> = (value: I) => O;
export type UnaryAsyncFn<I, O> = UnaryFn<I, Promise<O>>;

export const log = (value: unknown) => {
    const inspected = inspect(value, { depth: null })
    console.log(inspected);
}
