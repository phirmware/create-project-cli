// import { setUpFramework } from './frameworks';
import { setUpFramework } from './frameworks';
import Listr from 'listr';
import chalk from 'chalk';
import { projectInstall } from 'pkg-install';
import execa from 'execa';
import path from 'path';

// const getTemplate = {
//     'Angular': (options) => angular(options),
//     'React': (options) => react(options)
// }


async function getTemplateFiles(options) {
    // await getTemplate[options.template](options);
    await setUpFramework(options);
}

async function initGit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory,
    });
    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize Git'));
    }
    return;
}

export async function createProject(options) {

    const template = `${process.cwd()}/${options.projectName}`;
    const templateDir = path.resolve(template);
    options = {
        ...options,
        targetDirectory: templateDir || process.cwd(),
    }

    const tasks = new Listr([
        {
            title: 'Setting up project',
            task: () => getTemplateFiles(options)
        },
        {
            title: 'Initialized git',
            task: () => initGit(options),
            enabled: () => options.git
        },
        {
            title: 'Install dependencies',
            task: () => projectInstall({
                cwd: options.targetDirectory,
            }),
            skip: () => !options.runInstall ? 'Pass --install to automatically install' : undefined,
        }
    ]);

    await tasks.run();

    console.log('%s Project ready', chalk.green.bold('DONE'));
    return true;
}
