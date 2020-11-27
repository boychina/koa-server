"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const LogSchema = {
    url: String,
    type: String,
    msg: String,
    time: Date
};
const Log = mongoose.model('Log', new mongoose.Schema(LogSchema));
exports.default = Log;
//# sourceMappingURL=log.js.map