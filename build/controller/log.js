"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const koaRouter = require("koa-router");
const router = new koaRouter();
const url = require("url");
const log_1 = require("../model/log");
const response_1 = require("../util/response");
router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let path = url.parse(ctx.request.url, true);
    let query = path.query;
    let start = (+query.currentPage - 1) * +query.pageSize;
    let where = {};
    if (query.startTime || query.endTime) {
        where.time = {};
        if (query.startTime)
            where.time.$gte = new Date(query.startTime);
        if (query.endTime)
            where.time.$lte = new Date(query.endTime);
    }
    if (query.filterType && query.filterText) {
        where[query.filterType] = new RegExp(query.filterText);
    }
    let total = yield log_1.default.find(where).count({}).then((res) => {
        return res;
    });
    yield log_1.default
        .find(where)
        .skip(start)
        .limit(+query.pageSize)
        .sort({ time: -1 })
        .then((docs) => {
        ctx.body = response_1.resBody(docs, total);
    }).catch((reason) => {
        ctx.body = response_1.resError(ctx.request.url, reason);
    });
}));
module.exports = router;
//# sourceMappingURL=log.js.map