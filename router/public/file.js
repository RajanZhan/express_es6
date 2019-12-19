import express from "express";
const router = express.Router()
const FileService = require("@service/fileService");
const response = require("@utils/response");

router.get('/', async (req, res, next) => {
    console.log("hello");
    const fileService = new FileService();
    let a = 1;
    a++
    res.send(response.success({
        name:"name"+fileService.getFile()
    }))
})

export default router;