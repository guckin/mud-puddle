import {Driver, ElementQuery} from './driver';
import {UnaryAsyncFn} from './utility';

export const aggregateUrls = (getDriver: UnaryAsyncFn<void, Driver>) => async (): Promise<readonly string[]> => {
    const {goTo, getLinks} = await getDriver();
    await goTo('https://www.google.com/search?q=news&tbm=nws');
    const eachArticleLink: ElementQuery = {
        type: 'css',
        selector: '#rso > div > g-card > div > div > a'
    };
    return getLinks(eachArticleLink);
};

export const getAllText = (getDriver: UnaryAsyncFn<void, Driver>) => async (url: string): Promise<readonly string[]> => {
    const {goTo, getTexts} = await getDriver();
    await goTo(url);
    const bodyQuery: ElementQuery = {
        type: 'tag',
        tag: 'body'
    };
    return getTexts(bodyQuery);
}
