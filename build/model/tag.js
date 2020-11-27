"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const TagSchema = {
    text: String,
    date: Date
};
const Tag = mongoose.model('Tag', new mongoose.Schema(TagSchema));
exports.default = Tag;
//# sourceMappingURL=tag.js.map