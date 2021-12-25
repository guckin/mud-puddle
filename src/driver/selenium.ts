import {Builder, By, Locator, WebDriver} from 'selenium-webdriver';
import {ByCss, ByTag, Driver, ElementQuery} from './index';
import {Options, ServiceBuilder, setDefaultService} from 'selenium-webdriver/chrome';
import {assertNever} from '../assert-never';

export type NarrowedWebDriver = Pick<WebDriver, 'get' | 'getCurrentUrl' | 'findElement' | 'findElements'>;

export class SeleniumDriver implements Driver {

    static readonly forChrome = async (): Promise<Driver> => {
        const config = {
            chromeArguments: [
                '--headless',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-dev-tools',
                '--no-zygote',
                '--single-process',
                '--user-data-dir=/tmp/chrome-user-data',
                '--remote-debugging-port=9222'
            ],
            binaryPath: '/opt/chrome/chrome',
            driverPath: '/opt/chromedriver/chromedriver'
        };
        const options = new Options().addArguments(...config.chromeArguments).setChromeBinaryPath(config.binaryPath);
        const service = new ServiceBuilder(config.driverPath).build();
        setDefaultService(service);
        const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        return new SeleniumDriver(driver);
    };

    private constructor(private readonly seleniumDriver: NarrowedWebDriver) {}

    readonly goTo = (page: string): Promise<void> => this.seleniumDriver.get(page);

    readonly getUrl = (): Promise<string> => this.seleniumDriver.getCurrentUrl();

    readonly getText = async (query: ElementQuery): Promise<string> => {
        const locator = queryToLocator(query);
        const element = await this.seleniumDriver.findElement(locator);
        return element.getText();
    };

    readonly getTexts = async (query: ElementQuery): Promise<string[]> => {
        const locator = queryToLocator(query);
        const elements = await this.seleniumDriver.findElements(locator);
        const textQueries = elements.map(query => query.getText());
        return Promise.all(textQueries);
    };

    readonly getLinks = async (query: ElementQuery): Promise<string[]> => {
        const locator = queryToLocator(query);
        const elements = await this.seleniumDriver.findElements(locator);
        const elementLinkQueries = elements.map(element => element.getAttribute('href'));
        return Promise.all(elementLinkQueries);
    };

}

const cssQueryToLocator = ({selector}: ByCss): Locator => By.css(selector);

const tagQueryToLocator = ({tag}: ByTag): Locator => By.css(tag);

const queryToLocator = (query: ElementQuery): Locator => {
    switch (query.type) {
        case 'css': return cssQueryToLocator(query);
        case 'tag': return tagQueryToLocator(query);
        default: return assertNever(query);
    }
};
