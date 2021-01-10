const homedir = require('os').homedir();
const p = require('path');
const fs = require('fs');
const dbPath = p.join(homedir,'todoList')

const db={
    read(path = dbPath){
        return new Promise((resolve,reject)=>{
            fs.readFile(path,{flag:'a+'},(error,data)=>{
                if(error){
                    console.log(error)
                    reject(error)
                }else{
                    let list
                    try{
                        list = JSON.parse(data.toString())
                    } catch(error){
                        list = []
                    }
                    resolve(list)
                }
            })
        })
    },
    //写数据
    write(list,path=dbPath){
      return new Promise((resolve,reject)=>{
        const string = JSON.stringify(list)
        fs.writeFile(path,string,(error)=>{
          if(error){
            console.log(error)
            reject(error)

          }else{
            resolve()
          }
        })
      })
    }
}
module.exports = db
