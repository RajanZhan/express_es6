const { Public, Extends, Params, Returns, Schema, Joi } = require("magic-oopjs")
const commonService = require("@service/basic/commonService")
const entityManagement = require("@entity");

@Extends(commonService)
class yndpAccessService {

    /**
     *  添加访问记录
     */
    @Public
    @Params({
        openid: Joi.string().required(),
        group: Joi.string().required(),
        access_page: Joi.string().required(),
        access_time: Joi.date().required(),
        sustain_time: Joi.number().required(),
        event: Joi.string().required(),
        app: Joi.string().required(),
        remark:Joi.string().allow("").allow(null), 
    })
    @Returns({
        status: Joi.boolean().required(),
        message: Joi.string(),
    })
    async addAccessLog(params) {
        let result = await entityManagement.models.yndpEntity.create(params);
        //console.log(result)
        if (!result) {
            return {
                status: false,
                message: "添加访问记录数据失败"
            }
        }
        return {
            status: true,
        }
    }

    @Public
    @Params({
        group: Joi.string().required(),
        app:Joi.string().required(),
        page: Joi.number().min(1).required(),
        psize: Joi.number().max(50).required(),
        startTime: Joi.date(),
        endTime: Joi.date(),
    })
    @Returns({
        count:Joi.number().min(0).required(),
        rows:Joi.array().items({
            id:Joi.number().required(),
            openid:Joi.string().required(),
            group:Joi.string().required(),
            access_page:Joi.string().required(),
            access_time:Joi.date().required(),
            sustain_time:Joi.number().required(),
            event:Joi.string().required(),
            app:Joi.string().required(),
            remark:Joi.string().allow("").allow(null), 
        })
    })
    async findByGourpAndTimeRang(params) {
       let result = await entityManagement.models.yndpEntity.findAndCountAll({
            where:{
                group:params.group,
                app:params.app,
                access_time:{
                   $between: [new Date(params.startTime) , new Date(params.endTime)]
                }
            },
            offset:Number(params.page ) - 1,
            limit:Number(params.psize),
        })
        //console.log(result.rows,result.rows);
        return result;
        
    }


}

module.exports = yndpAccessService;
