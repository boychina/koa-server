"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const CategorySchema = {
    text: String,
    date: Date
};
const Category = mongoose.model('Category', new mongoose.Schema(CategorySchema));
exports.default = Category;
//# sourceMappingURL=category.js.map