"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
exports.resBody = (body = null, total = 0, error = false, msg = '') => {
    return {
        result: body,
        total: total,
        error: error,
        msg: msg
    };
};
exports.resError = (url, msg) => {
    logger_1.logger(logger_1.LogType.error, msg, url);
    return exports.resBody(null, 0, true, msg.message);
};
exports.resInfo = (url, msg) => {
    logger_1.logger(logger_1.LogType.info, msg);
    return exports.resBody(null, 0, false, msg);
};
//# sourceMappingURL=response.js.map