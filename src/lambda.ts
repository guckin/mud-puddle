import {Aggregator} from './aggregator';
import {SeleniumDriver} from './driver';
import {Scrapper} from './scrapper';

export const {getTopUrls} = new Aggregator(SeleniumDriver.forChrome);
export const {getAllRawText} = new Scrapper(SeleniumDriver.forChrome);
