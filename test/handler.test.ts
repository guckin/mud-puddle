import {Handler} from '../src/handler';
import {Driver} from '../src/driver';

describe('Handler', () => {
    it('navigates to google.com and gets the url', async () => {
        const {invoke} = getHandler();

        await invoke();

        expectItNavigatedToGoogle();
        expectItGotTheUrl();
    });
});

const driverMock: Driver = {
    getUrl: jest.fn(() => Promise.resolve('https://www.example.com')),
    goTo: jest.fn(() => Promise.resolve())
};

const getHandler = (): Handler => new Handler(() => Promise.resolve(driverMock));

const expectItNavigatedToGoogle = (): void => expect(driverMock.goTo).toHaveBeenCalledWith('https://www.google.com/');

const expectItGotTheUrl = (): void => expect(driverMock.getUrl).toHaveBeenCalled();
