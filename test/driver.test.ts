import {By} from 'selenium-webdriver';
import {ElementQuery, NarrowedWebDriver, SeleniumDriver} from '../src/driver';

describe('Selenium Driver', () => {
    it('navigates to a web page', async () => {
        const driver = getDriver();

        await driver.goTo('page');

        expectItNavigatedToPage('page');
    });

    it('gets the current url', async () => {
        const driver = getDriver();

        const url = await driver.getUrl();

        expect(url).toEqual(currentUrl);
    });

    it('gets the text of an element', async () => {
        const driver = getDriver();

        const query: ElementQuery = {
            type: 'css',
            selector: '#input'
        };
        const getText = await driver.getText(query);

        expectItToGetTheTextFromThePage(query.selector, getText);
    });
});

const currentUrl = 'url';

const elementText = 'some text';

const getTextMock = jest.fn(() => Promise.resolve(elementText));

const seleniumMock: NarrowedWebDriver = {
    get: jest.fn(() => Promise.resolve()),
    getCurrentUrl: jest.fn(() => Promise.resolve(currentUrl)),
    findElement: jest.fn(() => ({getText: getTextMock})) as jest.Mock
};

const getDriver = (): SeleniumDriver => new SeleniumDriver(seleniumMock);

const expectItNavigatedToPage = (page: string) => expect(seleniumMock.get).toHaveBeenCalledWith(page);

const expectItToGetTheTextFromThePage = (selector: string, text: string) => {
    expect(seleniumMock.findElement).toHaveBeenCalledWith(By.css(selector));
    expect(getTextMock).toHaveBeenCalled();
    expect(text).toEqual(elementText)
};

