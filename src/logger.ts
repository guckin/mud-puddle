import {inspect} from 'util';

export const log = <T>(value: T): T => {
    const inspected = inspect(value, {depth: null})
    console.log(inspected);
    return value;
};
