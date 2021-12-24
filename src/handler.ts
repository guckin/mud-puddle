import {Driver, ElementQuery} from './driver';

export class Handler {

    constructor(private readonly initDriver: () => Promise<Driver>) {}

    readonly invoke = async (): Promise<readonly string[]> => {
        const driver = await this.initDriver();
        return getTopNewsArticles(driver);
    }
}

const getTopNewsArticles = async ({goTo, getLinks}: Driver): Promise<readonly string[]> => {
    await goTo('https://www.google.com/search?q=news&tbm=nws');
    const eachArticleLink: ElementQuery = {
        type: 'css',
        selector: '#rso > div > g-card > div > div > a'
    };
    return getLinks(eachArticleLink);
};
