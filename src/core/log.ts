import chalk from "chalk";
import * as path from "path";
import { ROOT_PATH } from "src/constants";
import errorStackParser from "error-stack-parser";

class Logger {

  debug(...args: any[]) {
    this.log(chalk.blueBright, args);
  }

  info(...args: any[]) {
    this.log(chalk.white, args);
  }

  warn(...args: any[]) {
    this.log(chalk.yellowBright, args);
  }

  error(...args: any[]) {
    this.log(chalk.redBright, args);
  }

  private log(color: chalk.Chalk, args: any[]) {
    const timestamp = chalk.green(new Date().toISOString());
    const callingFile = chalk.gray(this.getCallingFile());
    const output = color.apply(chalk, args);
    console.log(`${timestamp} ${callingFile} ${output}`);
  }

  private getCallingFile(): string {
    const callingFileFrame = errorStackParser.parse(new Error())
      .find((frame => frame.fileName.includes(ROOT_PATH) && frame.fileName !== __filename));
    return path.relative(ROOT_PATH, callingFileFrame.fileName);
  }

}

export default new Logger();
