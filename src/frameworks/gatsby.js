import execSh from 'exec-sh';
import chalk from 'chalk';

const execShPromise = execSh.promise;

async function runScript(options) {
  try {
    const result = await execShPromise(`npx gatsby new ${options.projectName}`, true);
    console.log(result.stdout);
    return true;

  } catch (error) {
    console.error(`%s ${error}`, chalk.red.bold('ERROR'));
    return false;
  }
}

export async function gatsby(options) {
  await runScript(options);
}