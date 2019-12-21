const response = require("@utils/response");
const cache = require("@utils/cache");
module.exports = async (req, res, next) => {

    //console.log("鉴权中间件",cache); 
    //await cache.set("name","rajan",30);
    if (!req.headers || !req.headers['token'] || !req.headers['userid']) {

        return response.noauth([res, { message: "token或者userid 不存在" }]);
    }
    let userid = req.headers['userid'];
    let useridFromToken = await cache.get(req.headers['token']);
    if (userid != useridFromToken) {
        return response.noauth([res, { message: "token校验失败" }]);
    }
    next()
}