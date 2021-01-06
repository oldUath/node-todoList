const { Command } = require('commander');
const program = new Command();
const api = require('./index.js')
program
    .option('-x, --xxx', 'what the xxx')
program
    .command('add <taskName>')
    .description('add a task')
    .action((title) => {
        api.add(title)
    });
program
    .command('clear')
    .description('clear all task')
    .action((...args) => {
        console.log('this is clear');
    });

program.parse(process.argv);
