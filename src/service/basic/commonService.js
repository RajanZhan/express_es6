import { Private, Public } from "magic-oopjs"
const  entityManagement = require("@entity");

module.exports = class commonService {
    @Private
    user = null

    @Public
    async getData() {
        // console.log(entityManagement,"实体管理器");
        return "data";
    }

}