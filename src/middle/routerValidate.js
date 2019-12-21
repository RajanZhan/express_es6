const response = require("@utils/response");
const { Joi } = require("magic-oopjs");
module.exports = (rule, valueTarget) => {
    return (req, res, next) => {
        if (!rule) {
            return next()
        }
        let schema = Joi.object(rule);
        let value = {};
        switch (valueTarget) {
            case "body":
                value = req.body;
                break;
            case "params":
                value = req.params;
                break;
            case "query":
                value = req.query;
                break;
            default:
                value = req.query
        }

        let { error } = schema.validate(value);
        if (error) {
            let err = "";
            if (error.details && error.details.length >= 0) {
                for (let e of error.details) {
                    if (!e) {
                        continue;
                    }
                    err += e.message + "、"
                }
            }
           let  errorMsg = `接口参数校验异常,异常信息：${err}`;
            return response.error([res, {
                message: errorMsg
            }])
        }
        next();
    }

}