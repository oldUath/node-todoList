const program= require('commander');
program
    .option('-x, --xxx', 'what the xxx')
program
    .command('add <taskName>')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0,-1).join(' ')
        console.log(words);
    });

program.parse(process.argv);
