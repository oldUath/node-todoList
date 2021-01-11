//系统用户目录C:\Users\Uath
const db = require("./db.js");
const inquirer = require('inquirer')

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
  //读取之前的数据
  const list = await db.read()
  //打印当前的任务
  list.forEach((task,index)=>{
    console.log()
  })

  //对列表进行操作判断
  inquirer
    .prompt([
      {
        type:'list',
        name:'index',
        message: '请选择你想要操作的任务？',
        choices: [{name:'退出',value:'-1'},...list.map((task,index)=>{
          return {name:`${task.done ? '[√]':'[_]'} ${index+1} - ${task.title}`,value:index.toString()}
        }),{name:'+ 创建任务',value:'-2'}]
      },
    ])
    .then((answer) => {
      const index = parseInt(answer.index)
      if(index>=0){

      }else if(index === -2){
        //创建任务
      }
    });
}

