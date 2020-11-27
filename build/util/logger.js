"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const log_1 = require("../model/log");
var LogType;
(function (LogType) {
    LogType[LogType["error"] = 0] = "error";
    LogType[LogType["info"] = 1] = "info";
    LogType[LogType["danger"] = 2] = "danger";
    LogType[LogType["ok"] = 3] = "ok";
    LogType[LogType["test"] = 4] = "test";
})(LogType || (LogType = {}));
exports.LogType = LogType;
const logger = (type, msg, url) => {
    let date = new Date();
    // db
    var log = {
        url: url,
        time: new Date(),
        type: LogType[type],
        msg: msg.toString()
    };
    new log_1.default(log).save();
    // .log file
    let day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let buf = new Buffer(`
url: ${url}
time: ${day} ${time}
type: ${LogType[type]}
msg: ${msg}
------------------------------
	`);
    let path = `${__dirname}'/../../logs/${day}.log`;
    fs.readFile(path, (err, data) => {
        if (!data) {
            fs.writeFileSync(path, buf);
        }
        else {
            fs.appendFileSync(path, buf);
        }
    });
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map