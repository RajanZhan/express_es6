const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const conf = require("@config/config");
const config = conf.db
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};
const sequelize = new Sequelize(config.db, config.user, config.pwd, {
    host: config.host,
    dialect: config.dialect,
    freezeTableName: false,
    timestamps: false,
    logging:config.logging?config.logging:false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' ,// 东八区
    query: { raw:true },// 好好返回原数据，不要乱加对象进来
    operatorsAliases
});


sequelize.define('yndpEntity',require("@entity/yndpEntity"), {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false
});

sequelize.sync({ alter: config.alter }) // 自动更新 模型字段，如果字段已经存在数据，可能会被删除，所以慎用
module.exports = sequelize;