import {UnaryAsyncFn} from '../utility';

export type Driver = {
    readonly goTo: UnaryAsyncFn<string, void>;
    readonly getUrl: UnaryAsyncFn<void, string>;
    readonly getTexts: UnaryAsyncFn<ElementQuery, string[]>;
    readonly getLinks: UnaryAsyncFn<ElementQuery, string[]>;
};

export type ElementQuery = ByCss | ByTag;

export type ByCss = {
    readonly type: 'css',
    readonly selector: string;
};

export type ByTag = {
    readonly type: 'tag';
    readonly tag: Tag;
};

export type Tag = 'body';

export {SeleniumDriver} from './selenium';
