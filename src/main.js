/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import Listr from 'listr';
import chalk from 'chalk';
import path from 'path';
import {
  vue,
  angular,
  react,
  gatsby,
  expressJade,
  expressPUG,
  expressHBS,
  expressEJS,
  express,
} from './frameworks/index';

const getTemplate = {
  Angular: (options) => angular(options),
  React: (options) => react(options),
  Vue: (options) => vue(options),
  Gatsby: (options) => gatsby(options),
  'Node(Express)': (options) => express(options),
  'Express&Jade': (options) => expressJade(options),
  'Express&PUG': (options) => expressPUG(options),
  'Express&HBS': (options) => expressHBS(options),
  'Express&EJS': (options) => expressEJS(options),
};


async function getTemplateFiles(options) {
  try {
    await getTemplate[options.template](options);
  } catch (error) {
    console.error(`%s ${error}`, chalk.red.bold('ERROR'));
  }
}

export async function createProject(options) {
  const template = `${process.cwd()}/${options.projectName}`;
  const templateDir = path.resolve(template);
  const currentDirectory = path.resolve(process.cwd());
  options = {
    ...options,
    targetDirectory: templateDir || process.cwd(),
    currentDirectory,
  };

  const tasks = new Listr([
    {
      title: 'Setting up project',
      task: () => getTemplateFiles(options),
    },
  ]);

  try {
    await tasks.run();

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
  } catch (error) {
    console.error('%s Something went wrong', chalk.red.bold('ERROR'));
    return false;
  }
}
