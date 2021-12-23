import {Handler} from './handler';
import {Driver, SeleniumDriver} from './driver';
import {Options, ServiceBuilder, setDefaultService} from 'selenium-webdriver/chrome';
import {Builder} from 'selenium-webdriver';

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

const getSeleniumDriver = async (): Promise<Driver> => {
    const options = new Options().addArguments(...config.chromeArguments).setChromeBinaryPath(config.binaryPath);
    const service = new ServiceBuilder(config.driverPath).build();
    setDefaultService(service);
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    return new SeleniumDriver(driver);
};

export const {invoke: handler} = new Handler(getSeleniumDriver);
