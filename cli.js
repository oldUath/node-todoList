const { Command } = require('commander');
const program = new Command();
const api = require('./index.js')

//当后面没有参数时，就会打印出所有信息
if(process.argv.length===2){
  void api.showAll()
  return
}

program
    .option('-x, --xxx', 'what the xxx')
program
    .command('add <taskName>')
    .description('add a task')
    .action((title) => {
        api.add(title).then(()=>{console.log('添加成功')},()=>{console.log('添加失败')} )
    });
program
    .command('clear')
    .description('clear all task')
    .action(() => {
        api.clear().then(()=>{console.log('清除成功')},()=>{console.log('清除失败')} )
    });

program.parse(process.argv);
