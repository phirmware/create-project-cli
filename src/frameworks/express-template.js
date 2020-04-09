import execSh from 'exec-sh';
import chalk from 'chalk';

const execShPromise = execSh.promise;

async function runScript(options, template) {
  try {
    const result = await execShPromise(`npx express-generator --view=${template} ${options.projectName}`, true);
    console.log(result.stdout);

  } catch (error) {
    console.error(`%s Couldn't set up Express with ${template} template`, chalk.red.bold('ERROR'));
    return false;
  }
}

export async function expressJade(options) {
  await runScript(options, 'jade');
}

export async function expressPUG(options) {
  await runScript(options, 'pug');
}

export async function expressHBS(options) {
  await runScript(options, 'hbs');
}

export async function expressEJS(options) {
  await runScript(options, 'ejs');
}

export async function express(options) {
  await runScript(options, 'no-view');
}