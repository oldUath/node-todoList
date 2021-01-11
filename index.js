//系统用户目录C:\Users\Uath
const homedir = require('os').homedir();
const p = require('path');
const fs = require('fs');
const db = require("./db.js");
const dbPath = p.join(homedir,'todoList')



module.exports.add= async  (title)=>{
    //读之前的任务 ，因为读取是异步操作所以使用await和async
    const list = await db.read(dbPath);
    //添加一个任务
    list.push({title,done:false})
    //存储到文件里
   await db.write(list)

}
