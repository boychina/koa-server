"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const koaRouter = require("koa-router");
const router = new koaRouter();
const response_1 = require("../../util/response");
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.session.isNew || !ctx.session.user) {
        ctx.response.status = 403;
        ctx.body = response_1.resError(ctx.request.url, '未登录');
    }
    else {
        ctx.body = response_1.resBody(JSON.parse(ctx.session.user));
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map