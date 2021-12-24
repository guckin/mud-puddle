import {By, Locator, WebDriver} from 'selenium-webdriver';
import {UnaryAsyncFn} from './utility';

export type Driver = {
    readonly goTo: UnaryAsyncFn<string, void>;
    readonly getUrl: UnaryAsyncFn<void, string>;
    readonly getText: UnaryAsyncFn<ElementQuery, string>;
    readonly getLinks: UnaryAsyncFn<ElementQuery, string[]>;
};

export type NarrowedWebDriver = Pick<WebDriver, 'get' | 'getCurrentUrl' | 'findElement' | 'findElements'>;

export class SeleniumDriver implements Driver {

    constructor(private readonly seleniumDriver: NarrowedWebDriver) {}

    readonly goTo = (page: string): Promise<void> => this.seleniumDriver.get(page);

    readonly getUrl = (): Promise<string> => this.seleniumDriver.getCurrentUrl();

    readonly getText = async (query: ElementQuery): Promise<string> => {
        const locator = queryToLocator(query);
        const element = await this.seleniumDriver.findElement(locator);
        return element.getText();
    }

    readonly getLinks = async (query: ElementQuery): Promise<string[]> => {
        const locator = queryToLocator(query);
        const elements = await this.seleniumDriver.findElements(locator);
        const elementLinkQueries = elements.map(element => element.getAttribute('href'));
        return Promise.all(elementLinkQueries);
    }
}

export type ElementQuery = {
    type: 'css',
    selector: CssSelector
};

//TODO: Narrow this type down
export type CssSelector = string;

const queryToLocator = ({selector}: ElementQuery): Locator => By.css(selector);

