"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const DataSchema = {
    title: String,
    type: String,
    options: {
        data: Array,
        labels: Array
    }
};
const Data = mongoose.model('Data', new mongoose.Schema(DataSchema));
exports.default = Data;
//# sourceMappingURL=data.js.map