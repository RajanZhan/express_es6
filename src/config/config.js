const path = require("path");
module.exports = {
    port: 3008, // 监听的端口
    mode:"release",// debug  release
    // 别名的配置
    alias: {
        "_moduleAliases": {
            "@router": path.join(process.cwd(),'src',"./router"), // 路由
            "@middle": path.join(process.cwd(),'src',"./middle"), // 中间件
            "@service": path.join(process.cwd(),'src',"./service"),// service
            "@utils": path.join(process.cwd(),'src',"./utils"), // 工具库
            "@config": path.join(process.cwd(),'src',"./config"), 
            "@package": path.join(process.cwd(),'src',"./package"), //自定义的包
            "@static": path.join(process.cwd(),"./static"), //静态文件名
            "@entity": path.join(process.cwd(),"src","./entity"), //数据模型
            "@config": path.join(process.cwd(),"src","./config"), //配置
        }
    },
    db:{
        host:"localhost",
        db:"yndp_oprational_data",
        user:"root",
        pwd:"111111",
        //pwd:"jiang0912",
        dialect:"mysql",
        port:3306,
        alter:true,// 自动更新模型字段
        logging:false,
        pool:{
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    redis:{
        port:6379,
        host:"127.0.0.1",
        pass:"123456",
        db:0,
        isUse:1,
    }
}