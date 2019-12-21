const  { Factory } =require("magic-oopjs") 
// const yndpAccessService =  require("@service/yndpAccessService");
// console.log(yndpAccessService);
module.exports =  {
    yndpAccessService:Factory(require("@service/yndpAccessService"))
}