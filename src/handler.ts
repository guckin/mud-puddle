import {Driver} from './driver';

export class Handler {

    constructor(private readonly initDriver: () => Promise<Driver>) {}

    readonly invoke = async (): Promise<void> => {
        const {goTo, getUrl} = await this.initDriver();
        await goTo('https://www.google.com/');
        const url = await getUrl();
        console.log('URL -> ', url);
    }
}


