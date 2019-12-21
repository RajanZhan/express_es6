const Sequelize = require('sequelize');
module.exports = {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    openid:{
        type: Sequelize.STRING,
    },
    
    // 应用
    app:{
        type:Sequelize.STRING,
    },

    // 本条记录所属的分组
    group:{
        type: Sequelize.STRING,
    },

    access_page:{
        type: Sequelize.STRING,
    },

    access_time:{
        type:Sequelize.DATE,
    },
    
    // 持续的时间
    sustain_time:{
        type:Sequelize.INTEGER,
    },

    // 触发的埋点
    event:{
        type: Sequelize.STRING,
    },

    remark:{
        type: Sequelize.TEXT,
        defaultValue:""
    },
     
}