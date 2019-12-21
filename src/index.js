
const express = require("express");
var colors = require("colors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const config = require("./config/config");
const moduleAlias = require("module-alias");//路径别名库
require('express-async-errors');// 异常处理库

if (config && config.alias && config.alias._moduleAliases) {
    moduleAlias.addAliases(config.alias._moduleAliases);
}
if (config && config.redis && config.redis.isUse) {
    require("@utils/cache").init();
}
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views'))
require("@router")(app);

const logger = require("@utils/logger");
process.on('uncaughtException', function (err) {
    console.log('应用级异常: ' + err);
    logger.fatal(err);
});

app.listen(config.port, () => {
    console.log("APP is running on port " + config.port + "".brightCyan);
})
