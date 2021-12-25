export type NonEmptyArray<T> = readonly [T, ...Array<T>];

export type TwoOrMore<T> = readonly [T, ...NonEmptyArray<T>];
