import {WebDriver} from 'selenium-webdriver';
import {SeleniumDriver} from '../src/driver';

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
});

const currentUrl = 'url';
const seleniumMock: Pick<WebDriver, 'get' | 'getCurrentUrl'> = {
    get: jest.fn(() => Promise.resolve()),
    getCurrentUrl: jest.fn(() => Promise.resolve(currentUrl))
};

const getDriver = (): SeleniumDriver => {
    return new SeleniumDriver(seleniumMock);
};

const expectItNavigatedToPage = (page: string) => {
    expect(seleniumMock.get).toHaveBeenCalledWith(page);
};
