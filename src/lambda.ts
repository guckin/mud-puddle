import {SeleniumDriver} from './driver';
import {aggregateUrls, getAllText} from './bots';
import {Handler} from 'aws-lambda';
import {compose} from './functional';
import {log} from './logger';
import {tap} from './promise';

export const getTopUrls: Handler<void, readonly string[]> = compose(
    log,
    aggregateUrls(SeleniumDriver.forChrome),
    tap(log)
);
export const getAllRawText: Handler<string, readonly string[]> = compose(
    log,
    getAllText(SeleniumDriver.forChrome),
    tap(log)
);
