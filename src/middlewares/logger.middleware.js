import {getCurrentFormatedTime} from '../utils/helper.util'
import {logEvent} from '../services/logger.service'

let logger = (req, res, next) => {
    logEvent(res.statusCode, req.method, req.url);
    next();
}

module.exports = {
    logger
}