import express from "express";
const router = express.Router()
const response = require("@utils/response");
const { yndpAccessService } = require("@service");
const routerValidate =  require("@middle/routerValidate");
import { Joi } from "magic-oopjs"
const { dateFormate } = require("@utils/function");

router.post('/add', async (req, res, next) => {

    let addlog = await yndpAccessService.addAccessLog({
        openid: req.body.openid,
        group: req.body.group,
        access_page: req.body.access_page,
        access_time: new Date(),
        sustain_time: req.body.sustain_time,
        event: req.body.event,
        app:req.body.app,
        remark:req.body.remark?req.body.remark:""
    })
    //throw new Error("测试异常");
    response.success([res, {
        status: addlog.status
    }]);
})


// 根据分组名 和 时间段来筛选 
router.get('/findByGourpAndTimeRang',routerValidate({
    group: Joi.string().required(),
    app:Joi.string().required(),
    page: Joi.number().min(1).required(),
    psize: Joi.number().max(50).required(),
    startTime: Joi.date(),
    endTime: Joi.date(),
},"query"), async (req, res, next) => {

    let result = await yndpAccessService.findByGourpAndTimeRang({
        group:req.query.group,
        page:req.query.page,
        psize:req.query.psize,
        startTime:req.query.startTime?req.query.startTime:dateFormate("yyyy-MM-dd 00:00:00"),
        endTime:req.query.startTime?req.query.startTime:dateFormate("yyyy-MM-dd 23:59:59"),
        app:req.query.app,
        
    })
    response.success([res, result]);
})

module.exports = router;