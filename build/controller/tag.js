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
const tag_1 = require("../model/tag");
const response_1 = require("../util/response");
/**
 * @api {GET} http://localhost:8085/api/tag [获取所有标签]
 * @apiGroup Tag
 * @apiDescription 获取所有标签
 * @apiUse CODE_200
 * @apiUse CODE_500
 * @apiSuccessExample {json} Success Data Example
[
    {
      "_id": "585743f87dab573ef45f4841",
      "text": "js",
      "date": "2016-12-19T02:20:40.613Z",
      "__v": 0
    },
    {
      "_id": "5857445e7dab573ef45f4842",
      "text": "css",
      "date": "2016-12-19T02:22:22.337Z",
      "__v": 0
    },
    {
      "_id": "585744627dab573ef45f4843",
      "text": "vue",
      "date": "2016-12-19T02:22:26.133Z",
      "__v": 0
    },
    {
      "_id": "585744fd7dab573ef45f4844",
      "text": "angular2",
      "date": "2016-12-19T02:25:01.811Z",
      "__v": 0
    },
    {
      "_id": "585744ff7dab573ef45f4845",
      "text": "react",
      "date": "2016-12-19T02:25:03.463Z",
      "__v": 0
    }
]
 */
router.get('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let path = url.parse(ctx.request.url, true);
    let total = yield tag_1.default.find().count({}).then((res) => {
        return res;
    });
    yield tag_1.default
        .find()
        .then((docs) => {
        ctx.body = response_1.resBody(docs, total);
    }).catch((reason) => {
        ctx.body = response_1.resError(ctx.request.url, reason);
    });
}));
/**
 * @api {POST} http://localhost:8085/api/category [添加标签]
 * @apiGroup Tag
 * @apiDescription 添加标签
 * @apiUse CODE_200
 * @apiUse CODE_500
*/
router.post('/', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let body = ctx.request.body;
    var tag = {
        text: body.text,
        date: body.date || new Date()
    };
    yield new tag_1.default(tag).save().then((val) => {
        ctx.body = response_1.resBody(val);
    }).catch((reason) => {
        ctx.body = response_1.resError(ctx.request.url, reason);
    });
}));
/**
 * @api {DELETE} http://localhost:8085/api/category/:id [删除标签]
 * @apiParam {Number} id Tag unique ID.
 * @apiGroup Tag
 * @apiDescription 删除标签
 * @apiUse CODE_200
 * @apiUse CODE_500
*/
router.delete('/:id', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    let id = ctx.params.id;
    yield tag_1.default.findByIdAndRemove(id).then((res) => {
        ctx.body = response_1.resInfo(ctx.request.url, 'success');
    }).catch((reason) => {
        ctx.body = response_1.resError(ctx.request.url, reason);
    });
}));
module.exports = router;
//# sourceMappingURL=tag.js.map