const { getTime } = require("@utils/function");
const {mypackage} = require("@package/mypackage");
module.exports =  class {
    getFile()
    {
        return "getfile   " + mypackage();
    }
}