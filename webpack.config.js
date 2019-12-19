var webpcak = require('webpack');
const fs = require("fs");
const path = require("path");
const config = require("./config/config");
var CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

nodeModules["sequelize"] = "commonjs sequelize";
nodeModules["redis"] = "commonjs redis";
nodeModules["webpack"] = "commonjs webpack";
nodeModules["html-webpack-plugin"] = "commonjs html-webpack-plugin";
nodeModules["webpack-hot-middleware"] = "commonjs webpack-hot-middleware";
nodeModules["webpack-dev-middleware"] = "commonjs webpack-dev-middleware";
nodeModules["ali-oss"] = "commonjs ali-oss";
nodeModules["art-template"] = "commonjs art-template";
nodeModules["think-wx"] = "commonjs think-wx";
nodeModules["rajan-datamodel"] = "commonjs rajan-datamodel";
nodeModules["tedious"] = "commonjs tedious";
nodeModules["pg-hstore"] = "commonjs pg-hstore";
nodeModules["cache-manager"] = "commonjs cache-manager";
nodeModules["class-validator"] = "commonjs class-validator";
nodeModules["class-transformer"] = "commonjs class-transformer";
nodeModules["@nestjs/microservices"] = "commonjs    @nestjs/microservices";
nodeModules["module-alias"] = "commonjs module-alias";

let ignoreMudles = {
    "ali-oss": "^5.2.0",
    "art-template": "^3.0.3",
    "body-parser": "^1.18.2",
    "cookie-parser": "^1.4.3",
    "ejs": "^2.5.9",
    "express": "^4.16.3",
    "jsonminify": "^0.4.1",
    "log4js": "^2.7.0",
    "moment": "^2.22.1",
    "mosca": "^2.8.3",
    "mqtt": "^2.18.3",
    "qr-image": "^3.2.0",
    "rajan-datamodel": "^1.0.1",
    "redis": "^2.8.0",
    "request": "^2.88.0",
    "socket.io": "^2.1.1",
    "svg-captcha": "^1.3.11",
    "ueditor": "^1.2.3",
    "uuid": "^3.2.1",
    "vant": "^1.1.7",
    "vue-resource": "^1.5.1",

    "ws": "^6.0.0"
}
// for (let i in ignoreMudles) {
// nodeModules[i] = "commonjs " + i;
// }
// const jsonmini = require("jsonminify");
// var srcConfig = JSON.parse(jsonmini(fs.readFileSync(path.join(__dirname, "./config.json")).toString()));

// if(srcConfig.debug != 0)
// {
// throw new Error("无法编译代码，请将config.json中的debug 值设置为 0");
// }

const baseDevPath = './dist/'; //编译的目标路径
const baseSrcDevPath = path.join(__dirname, `./dist/`) // 源代码的路径


module.exports = {
    entry: [
        "babel-polyfill",
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, baseDevPath + '/'),
        filename: 'index.js'
    },
    target: 'node',
    externals: nodeModules,
    context: __dirname,
    node: {
        __filename: false,
        __dirname: false
    },
    resolve: {
        //root: __dirname,
        alias: config.alias._moduleAliases || {},
        modules: config.alias._moduleDirectories || [] // eg: ["node_modules", "node_modules_custom", "src"]
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: true, // 启用源码混淆加密
            }
        }),
        new CopyWebpackPlugin([

            // // 复制依赖配置文件
            {
                from: path.join(__dirname + `/package.json`),
                to: path.join(__dirname, `dist/package.json`)
            },

            // // 复制静态文件夹
            {
                from: path.join(__dirname + `/static`),
                to: path.join(__dirname, `/dist/static`)
            },

        ]),
    ],
    //处理模块资源
    module: {
        rules: [{ //处理js文件
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        //使用env预设来处理es6语法的js文件
                        //presets: ['env']
                    }
                }],
                exclude: [
                    path.resolve(__dirname, './node_modules')
                ]
            },

        ]
    }

}