//系统用户目录C:\Users\Uath
const homedir = require('os').homedir();
const fs = require('fs');
const dbPath = './todoList.txt'



module.exports.add=(title)=>{
    //读之前的任务
                //参数1：文件路径，参数2的a+是如果没有此文件则创建，参数三是回调函数
    fs.readFile(dbPath,{flag:'a+'},(error , data)=>{
        let list;
        try{
            list = JSON.parse(data.toString())
        }catch (error){
            list = []
        }
        console.log(list)
        //添加一个任务
        const task={
            title:title,
            done:false
        }
        list.push(task)
        console.log(list)
        //存储到文件里
        const string = JSON.stringify(list)
        fs.writeFile(dbPath,string,(error2)=>{
            if(error2){
                console.log(error2)
            }
        })
    })
}
