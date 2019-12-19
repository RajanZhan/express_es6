const path = require("path");
module.exports = {
    port: 3000, // 监听的端口
    // 别名的配置
    alias: {
        "_moduleAliases": {
            "@router": path.join(process.cwd(),"./router"), // 路由
            "@service": path.join(process.cwd(),"./service"),// service
            "@utils": path.join(process.cwd(),"./utils"), // 工具库
            "@config": path.join(process.cwd(),"./config"), 
            "@package": path.join(process.cwd(),"./package"), //自定义的包
            "@static": path.join(process.cwd(),"./static"), //静态文件名
        }
    },
}