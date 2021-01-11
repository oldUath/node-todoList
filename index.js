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
    console.log(`${task.done ? '[√]':'[_]'}${index+1} - ${task.title}`)
  })

  //对列表进行操作判断
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'theme',
        message: 'What do you want to do?',
        choices: [
          'Order a pizza',
          'Make a reservation',
          new inquirer.Separator(),
          'Ask for opening hours',
          {
            name: 'Contact support',
            disabled: 'Unavailable at this time',
          },
          'Talk to the receptionist',
        ],
      },
      {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
        filter: function (val) {
          return val.toLowerCase();
        },
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, '  '));
    });
}

