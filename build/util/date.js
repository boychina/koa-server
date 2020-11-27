"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertTen = (num) => {
    return num < 10 ? ('0' + num) : num;
};
exports.convertToDate = (val) => {
    let date = new Date(val);
    if (date.toString() === 'Invalid Date') {
        return '0000-00-00';
    }
    let year = date.getFullYear();
    let month = convertTen(date.getMonth() + 1);
    let day = convertTen(date.getDate());
    return `${year}-${month}-${day}`;
};
//# sourceMappingURL=date.js.map