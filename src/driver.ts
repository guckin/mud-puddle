import {WebDriver} from 'selenium-webdriver';
import {UnaryAsyncFn} from './utility';

export type Driver = {
    readonly goTo: UnaryAsyncFn<string, void>;
    readonly getUrl: UnaryAsyncFn<void, string>;
};

export class SeleniumDriver implements Driver {

    constructor(private readonly seleniumDriver: Pick<WebDriver, 'get' | 'getCurrentUrl'>) {}

    readonly goTo = (page: string): Promise<void> => this.seleniumDriver.get(page);
    
    readonly getUrl = (): Promise<string> => this.seleniumDriver.getCurrentUrl();
}



