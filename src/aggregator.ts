import {Driver, ElementQuery} from './driver';
import {UnaryAsyncFn} from './utility';

export class Aggregator {

    constructor(private readonly getDriver: UnaryAsyncFn<void, Driver>) {}

    readonly getTopUrls = async (): Promise<readonly string[]> => {
        const {goTo, getLinks} = await this.getDriver();
        await goTo('https://www.google.com/search?q=news&tbm=nws');
        const eachArticleLink: ElementQuery = {
            type: 'css',
            selector: '#rso > div > g-card > div > div > a'
        };
        return getLinks(eachArticleLink);
    };
}
