const yndpaccess = require("@router/access/yndpAccess");
const authMiddle = require("@middle/auth");
const errorMiddle = require("@middle/error");
const notFound = require("@middle/notFound");
module.exports =  app=>{
    // app.use("/public/file",file)
    app.use("/access/yndp",authMiddle,yndpaccess)


    // 服务器错误处理中间件
    app.use(errorMiddle)

    // 404 中间件
    app.use(notFound)
}
