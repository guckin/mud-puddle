import {SeleniumDriver} from './driver';
import {aggregateUrls, getAllText} from './bots';
import {Handler} from 'aws-lambda';
import {compose, log, tap} from './utility';

export const getTopUrls: Handler<void, readonly string[]> = compose(
    aggregateUrls(SeleniumDriver.forChrome),
    tap(log)
);
export const getAllRawText: Handler<string, readonly string[]> = compose(
    getAllText(SeleniumDriver.forChrome),
    tap(log)
);
