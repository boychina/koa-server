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
const url = require("url");
const category_1 = require("../model/category");
const response_1 = require("../util/response");
/**
 * @api {GET} http://localhost:8085/api/category [获取所有分类]
 * @apiGroup Category
 * @apiDescription 获取所有分类
 * @apiUse CODE_200
 * @apiUse CODE_500
 * @apiSuccessExample {json} Success Data Example
    [
            {
                "_id": "58574961e41d873604a59e8c",
                "text": "技术",
                "date": "2016-12-19T02:43:45.951Z",
                "__v": 0
            },
            {
                "_id": "58574982e41d873604a59e8d",
                "text": "笔记",
                "date": "2016-12-19T02:44:18.629Z",
                "__v": 0
            },
            {
                "_id": "585749aaeb1b95321856d9af",
                "text": "其它",
                "date": "2016-12-19T02:44:58.389Z",
                "__v": 0
            },
            {
                "_id": "585749b4eb1b95321856d9b0",
                "text": "测试",
                "date": "2016-12-19T02:45:08.094Z",
                "__v": 0
            },
            {
                "_id": "585ce1bde74aec51ec2d191a",
                "text": "gg",
                "date": "2016-12-23T08:35:09.550Z",
                "__v": 0
            }
        ]
*/
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let path = url.parse(ctx.request.url, true);
    let total = yield category_1.default.find().count({}).then((res) => {
        return res;
    });
    yield category_1.default
        .find()
        .then((docs) => {
        ctx.body = response_1.resBody(docs, total);
    }).catch((reason) => {
        ctx.body = response_1.resError(ctx.request.url, reason);
    });
}));
/**
 * @api {POST} http://localhost:8085/api/category [添加分类]
 * @apiGroup Category
 * @apiDescription 添加分类
 * @apiUse CODE_200
 * @apiUse CODE_500
*/
router.post('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let body = ctx.request.body;
    var category = {
        text: body.text,
        date: body.date || new Date()
    };
    yield new category_1.default(category).save().then((val) => {
        ctx.body = response_1.resBody(val);
    }).catch((reason) => {
        ctx.body = response_1.resError(ctx.request.url, reason);
    });
}));
/**
 * @api {DELETE} http://localhost:8085/api/category/:id [删除分类]
 * @apiParam {Number} id Category unique ID.
 * @apiGroup Category
 * @apiDescription 删除分类
 * @apiUse CODE_200
 * @apiUse CODE_500
*/
router.delete('/:id', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = ctx.params.id;
    yield category_1.default.findByIdAndRemove(id).then((res) => {
        ctx.body = response_1.resInfo(ctx.request.url, 'success');
    }).catch((reason) => {
        ctx.body = response_1.resError(ctx.request.url, reason);
    });
}));
module.exports = router;
//# sourceMappingURL=category.js.map