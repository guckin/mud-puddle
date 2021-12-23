export type UnaryFn<I, O> = (value: I) => O;
export type UnaryAsyncFn<I, O> = UnaryFn<I, Promise<O>>;
