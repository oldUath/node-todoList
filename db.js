const homedir = require('os').homedir();
const p = require('path');
const fs = require('fs');
const home = process.env.HOME || homedir;
const dbPath = p.join(home,'.todoList')

const db={
    read(path = dbPath){
        return new Promise((resolve,reject)=>{
            fs.readFile(path,{flag:'a+'},(error,data)=>{
                if(error){return reject(error)}
                let list
                try{
                    list = JSON.parse(data.toString())
                } catch(error){
                    list = []
                }
                resolve(list)

            })
        })
    },
    //写数据
    write(list,path=dbPath){
      return new Promise((resolve,reject)=>{
        const string = JSON.stringify(list)
        fs.writeFile(path,string,(error)=>{
          if(error){ return reject(error) }
          resolve()
        })
      })
    }
}
module.exports = db
