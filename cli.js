const { Command } = require('commander');
const program = new Command();
const api = require('./index.js')

//当后面没有参数时，就会打印出所有信息
if(process.argv.length===2){
  api.showAll()
  return
}

program
    .option('-x, --xxx', 'what the xxx')
program
    .command('add <taskName>')
    .description('add a task')
    .action((title) => {
        api.add(title)
      console.log(process.argv)
    });
program
    .command('clear')
    .description('clear all task')
    .action(() => {
        api.clear()
    });

program.parse(process.argv);
