import chalk from 'chalk';
import dedent from 'dedent-js';

class LogService {

    printError = (error) => {
        console.log(chalk.bgRed(' ERROR ') + ' ' + error)
    };
    
    printSuccess = (msg) => {
        console.log(chalk.bgGreen(' SUCCESS ') + ' ' + msg);
    }
    
    printHelp = () => {
        console.log(dedent(`${chalk.bgCyan(' HELP ')}
        Without params - weather output
        -s [City] - set city
        -h - print help
        -t [Token] - set token`));
    }
}

export default new LogService();