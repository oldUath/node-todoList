const { Command } = require('commander');
const program = new Command();
program
    .option('-x, --xxx', 'what the xxx')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0,-1).join(' ')
        console.log(args[args.length-1]);
    });
program
    .command('clear')
    .description('clear all task')
    .action((...args) => {
        console.log('this is clear');
    });

program.parse(process.argv);
