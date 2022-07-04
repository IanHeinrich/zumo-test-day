import { getCurrentFormatedTime } from '../utils/helper.util';

async function logEvent(statusCode, method, url) {
    let currentTime = getCurrentFormatedTime();
    //Probably log to gcp or database
    console.log(`[${currentTime}] ${method}:${url} ${statusCode}`);
}

async function logError(statusCode, method, url, error) {
    let currentTime = getCurrentFormatedTime();
    //Probably log to gcp or database
    console.error(`[${currentTime}] ${method}:${url} ${statusCode} | ${error}`);
}

module.exports = {
    logEvent,
    logError,
}