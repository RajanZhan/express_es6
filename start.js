// require('babel-register') ({
//     presets: [ 'env' ]
// })

// module.exports = require('./index.js')


require('babel-core/register');
require('./index.js');
require("babel-core").transform("code", {
    plugins: ["transform-runtime"],
    presets: ['env'],
    sourceMaps: true,
});