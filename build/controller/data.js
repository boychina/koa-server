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
const post_1 = require("../model/post");
const response_1 = require("../util/response");
const date_1 = require("../util/date");
var ChartType;
(function (ChartType) {
    ChartType[ChartType["pie"] = 0] = "pie";
    ChartType[ChartType["doughnut"] = 1] = "doughnut";
    ChartType[ChartType["line"] = 2] = "line";
    ChartType[ChartType["word"] = 3] = "word";
})(ChartType || (ChartType = {}));
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let arr = [];
    yield post_1.default.aggregate({
        $group: { _id: "$delivery", count: { $sum: 1 } }
    }).exec((err, res) => {
        let obj = {
            title: '文章数据',
            type: ChartType[ChartType.pie],
            options: {
                data: res.map(x => x.count),
                labels: res.map(x => x._id ? '已发布' : '未发布')
            }
        };
        arr.push(obj);
    });
    yield post_1.default.aggregate({
        $group: { _id: "$category", count: { $sum: 1 } }
    }).exec((err, res) => {
        let obj = {
            title: '分类数据',
            type: ChartType[ChartType.pie],
            options: {
                data: res.map(x => x.count),
                labels: res.map(x => x._id)
            }
        };
        arr.push(obj);
    });
    yield post_1.default.aggregate([
        { $unwind: "$tag" }, {
            $group: { _id: "$tag", count: { $sum: 1 } }
        }
    ]).exec((err, res) => {
        let data = res.map(x => x.count);
        let labels = res.map(x => x._id);
        let obj = {
            title: '标签数据',
            type: ChartType[ChartType.doughnut],
            options: {
                data: data,
                labels: labels
            }
        };
        // list
        let list = [];
        data.forEach((x, i) => {
            list.push([labels[i], x * 20]);
        });
        let obj2 = {
            title: '标签云',
            type: ChartType[ChartType.word],
            options: {
                list: list
            }
        };
        arr.push(obj);
        arr.push(obj2);
    });
    yield post_1.default.aggregate([
        { $group: { _id: "$date", count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
    ]).exec((err, res) => {
        let obj = {
            title: '文章日期趋势',
            type: ChartType[ChartType.line],
            options: {
                label: 'post',
                data: res.map(x => parseInt(x.count)),
                labels: res.map(x => date_1.convertToDate(x._id))
            }
        };
        arr.push(obj);
    });
    ctx.body = response_1.resBody(arr);
}));
module.exports = router;
//# sourceMappingURL=data.js.map