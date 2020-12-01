"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resInfo = exports.resError = exports.resBody = void 0;
const logger_1 = require("./logger");
const resBody = (body = null, total = 0, error = false, msg = '') => {
    return {
        result: body,
        total: total,
        error: error,
        msg: msg
    };
};
exports.resBody = resBody;
const resError = (url, msg) => {
    logger_1.logger(logger_1.LogType.error, msg, url);
    return exports.resBody(null, 0, true, msg.message);
};
exports.resError = resError;
const resInfo = (url, msg) => {
    logger_1.logger(logger_1.LogType.info, msg);
    return exports.resBody(null, 0, false, msg);
};
exports.resInfo = resInfo;
//# sourceMappingURL=response.js.map