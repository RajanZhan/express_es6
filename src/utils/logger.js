var log4js = require('log4js');
import { Factory } from "magic-oopjs"
/**
 * 第一种：
 * configure方法为配置log4js对象，内部有levels、appenders、categories三个属性
 * levels:
 *         配置日志的输出级别,共ALL<TRACE<DEBUG<INFO<WARN<ERROR<FATAL<MARK<OFF八个级别,default level is OFF
 *         只有大于等于日志配置级别的信息才能输出出来，可以通过category来有效的控制日志输出级别
 * appenders:
 *         配置文件的输出源，一般日志输出type共有console、file、dateFile三种
 *         console:普通的控制台输出
 *         file:输出到文件内，以文件名-文件大小-备份文件个数的形式rolling生成文件
 *         dateFile:输出到文件内，以pattern属性的时间格式，以时间的生成文件
 * replaceConsole:
 *         是否替换控制台输出，当代码出现console.log，表示以日志type=console的形式输出
 *                 
 */

log4js.configure({
    appenders: {
        cd: {     //人
            type: 'dateFile',
            filename: process.cwd() + '/logs/log.log',
            maxLogSize: '2M',//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
            backups: 7,//当文件内容超过文件存储空间时，备份文件的数量
            compress : true,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
            encoding: 'utf-8',//default "utf-8"，文件的编码
            pattern: "-yyyy-MM-dd-hh.log",
            // category : 'log_file',
            numBackups: 7, // keep five backup files
            // compress: true, // compress the backups
            encoding: 'utf-8'
        }
    },
    categories: { default: { appenders: ['cd'], level: 'ALL' } },  //levels are ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, MARK,OFF
    replaceConsole: true
})


var logger = log4js.getLogger('cd');
class Logger {

    /**
     * 日常的日志信息
     */
    info(msg) {
        logger.info(msg)
    }


    /**
     * 警告日志，可能是函数调用时，参数不合法
     */
    warn(msg) {
        logger.info(msg)
    }

    /**
     *  用于程序在运行时，被用户操作过程中，发生影响程序正常运转的情况
     */
    error(msg) {
        logger.error(msg)
    }

    /**
     *  系统级的异常，如内存溢出
     */
    fatal(msg) {
        logger.fatal(msg)
    }
}

module.exports = Factory(Logger)