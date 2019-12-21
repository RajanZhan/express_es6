const response = require("@utils/response");
module.exports = ( req, res, next) => {
    response.error([res,{
        message:`资源${req.path} 不存在或者不可访问`
    }]);
}