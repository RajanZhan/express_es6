import express from "express"
import colors from "colors";
import fs from "fs"
import path from "path"
import bodyParser from "body-parser"
import config from "./config/config"
import moduleAlias  from 'module-alias'
if(config && config.alias && config.alias._moduleAliases)
{
    moduleAlias.addAliases(config.alias._moduleAliases);
}
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views'))
require("@router")(app);
app.listen(config.port, () => {
    console.log("APP is running on port"+config.port);
})