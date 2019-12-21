const response = require("@utils/response");
module.exports = (err, req, res, next) => {
   
    response.error([res,{
        message:err.message?err.message:"",
        stack:err.stack?err.stack:""
    }]);
}