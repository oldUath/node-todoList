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
        //选中的任务，进行操作
        inquirer
          .prompt([
            {
              type:'list',
              name:'action',
              message: '请选择操作',
              choices: [
                {name:'退出',value:'quit'},
                {name:'已完成',value:'markAsDone'},
                {name:'未完成',value:'markAsUndone'},
                {name:'改标题',value:'updateTitle'},
                {name:'删除',value:'remove'},
              ]
            },
          ]).then(answer2=>{
            switch (answer2.action){
              case 'markAsDone':
                list[index].done = true
                db.write(list)
                break;
              case 'markAsUndone':
                list[index].done = false
                db.write(list)
                break;
              case 'updateTitle':
                inquirer.prompt(
                  {
                    type:'input',
                    name:'title',
                    message:'新的标题',
                    default:list[index].title
                  }
                ).then((answer) => {
                  list[index].title=answer.title
                  db.write(list)
                });
                break;
              case 'remove':
                list.splice(index,1)
                db.write(list)
                break;
            }
        })
      }else if(index === -2){
        //创建任务
        inquirer.prompt(
          {
            type:'input',
            name:'title',
            message:'输入任务标题',
          }
        ).then((answer) => {
          list.push({
            title:answer.title,
            done:false
          })
          db.write(list)
        });
      }
    });
}

