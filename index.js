//系统用户目录C:\Users\Uath
const db = require("./db.js");

module.exports.add= async  (title)=>{
    //读之前的任务 ，因为读取是异步操作所以使用await和async
    const list = await db.read();
    //添加一个任务
    list.push({title,done:false})
    //存储到文件里
   await db.write(list)
}
//清除操作
module.exports.clear=async ()=>{
  await db.write([])
}
//展示所有
module.exports.showAll=async ()=>{
  console.log('showAll')
}

