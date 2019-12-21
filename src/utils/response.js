import { Factory,Params,Any,Joi } from "magic-oopjs"
const config = require("@config/config")
const logger = require("@utils/logger");

class Response {

    @Params([Any,Any])
    success(output) {
        let res = output[0]
        let data = output[1]
        res.status(200);
        res.send({
            data,
        })
    }

    /**
     * 权限不足，禁止访问
     * @param {} output 
     */
    @Params([Any,{
        message:Joi.string(),
    }])
    forbidden(output) {
        let res = output[0]
        let message = output[1]
        res.status(403);
        res.send({
            message,
        })
    }

    /**
     * 授权信息认证失败
     * @param {} output 
     */
    @Params([Any,{
        message:Joi.string(),
    }])
    noauth(output) {
        let res = output[0]
        let message = output[1]
        res.status(401);
        res.send({
            message,
        })
    }

    /**
     * 服务器错误
     * @param {} output 
     */
    @Params([Any,{
        message:Joi.string(),
        stack:Joi.string()
    }])
    error(output) {
        let res = output[0]
        let data = output[1]
        res.status(500);
        if (config.mode == "debug") {
            res.send({
                message: data && data.message ? data.message : "",
                stack: data && data.stack ? data.stack : "",
            })
        }
        else {
            res.send({
                message: data && data.message ? data.message : "",
                stack: "",
            })
            // 写到日志
            logger.error({
                message: data && data.message ? data.message : "",
                stack: data && data.stack ? data.stack : "",
            })
        }
    }


    /**
     * 资源或接口不存在
     * @param {} output 
     */
    @Params([Any,{
        message:Joi.string(),
    }])
    notFound(output) {
        let res = output[0]
        let data = output[1]
        res.status(404);
        res.send({
            message: data && data.message ? data.message : "",
        })
    }

}

module.exports = Factory(Response);