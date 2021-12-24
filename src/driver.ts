import {By, Locator, WebDriver} from 'selenium-webdriver';
import {UnaryAsyncFn} from './utility';

export type Driver = {
    readonly goTo: UnaryAsyncFn<string, void>;
    readonly getUrl: UnaryAsyncFn<void, string>;
};

export type NarrowedWebDriver = Pick<WebDriver, 'get' | 'getCurrentUrl' | 'findElement'>;

export class SeleniumDriver implements Driver {

    constructor(private readonly seleniumDriver: NarrowedWebDriver) {}

    readonly goTo = (page: string): Promise<void> => this.seleniumDriver.get(page);

    readonly getUrl = (): Promise<string> => this.seleniumDriver.getCurrentUrl();

    readonly getText = async (query: ElementQuery): Promise<string> => {
        const element = await this.seleniumDriver.findElement(queryToLocator(query));
        return element.getText();
    }
}

export type ElementQuery = {
    type: 'css',
    selector: CssSelector
};

export type CssSelector = string;

const queryToLocator = ({selector}: ElementQuery): Locator => By.css(selector);

