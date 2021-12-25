import {Driver, ElementQuery} from './driver';
import {UnaryAsyncFn} from './utility';

export class Scrapper {

    constructor(private readonly getDriver: UnaryAsyncFn<void, Driver>) {}

    readonly getAllRawText = async (url: string): Promise<string[]> => {
        const {goTo, getTexts} = await this.getDriver();
        await goTo(url);
        const bodyQuery: ElementQuery = {
            type: 'tag',
            tag: 'body'
        };
        return getTexts(bodyQuery);
    }

}
