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
router.post('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let body = ctx.request.body;
    let user = {
        username: body.username,
        password: body.password
    };
    if (user.username === 'admin' && user.password === 'admin') {
        delete user.password;
        ctx.session.user = JSON.stringify(user);
        ctx.body = response_1.resBody(user, 0, false, '');
    }
    else {
        ctx.response.status = 401;
        ctx.body = response_1.resBody({}, 0, true, '用户名或密码不正确');
    }
}));
module.exports = router;
//# sourceMappingURL=login.js.map