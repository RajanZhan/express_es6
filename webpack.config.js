var webpcak = require('webpack');
const fs = require("fs");
const path = require("path");
const config = require("./src/config/config");
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
nodeModules["@babel/runtime/helpers/interopRequireDefault"] = "commonjs @babel/runtime/helpers/interopRequireDefault";
nodeModules["@babel/runtime/helpers/classCallCheck"] = "commonjs @babel/runtime/helpers/classCallCheck";
nodeModules["@babel/runtime/helpers/createClass"] = "commonjs @babel/runtime/helpers/createClass";
nodeModules["@babel/runtime/helpers/regenerator"] = "commonjs @babel/runtime/helpers/regenerator";
nodeModules["@babel/runtime/helpers/asyncToGenerator"] = "commonjs @babel/runtime/helpers/asyncToGenerator";
nodeModules["@babel/runtime/regenerator"] = "commonjs @babel/runtime/regenerator";
nodeModules["@babel/runtime/helpers/applyDecoratedDescriptor"] = "commonjs @babel/runtime/helpers/applyDecoratedDescriptor";
nodeModules["@babel/runtime/helpers/initializerDefineProperty"] = "commonjs @babel/runtime/helpers/initializerDefineProperty";
nodeModules["@babel/runtime/helpers/initializerWarningHelper"] = "commonjs @babel/runtime/helpers/initializerWarningHelper";
nodeModules["@babel/runtime/helpers/defineProperty"] = "commonjs @babel/runtime/helpers/defineProperty";
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


// 处理编译时的文件路径别名
var _moduleAliases = {};
if (config.alias._moduleAliases) {
    for (let i in config.alias._moduleAliases) {
        if (config.alias._moduleAliases[i]) {
            _moduleAliases[i] = config.alias._moduleAliases[i].replace(/src/g, '.dist');
        }
    }
}



module.exports = {
    entry: [
        "babel-polyfill",
        './src/index.js'
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