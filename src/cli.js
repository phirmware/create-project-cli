import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";

function parseArgumentsIntoOptions(rawArgs) {
    const args = arg(
        {
            '--git': Boolean,
            '--yes': Boolean,
            '--install': Boolean,
            '--name': String,
            '-g': '--git',
            '-y': '--yes',
            '-i': '--install'
        },
        {
            argv: rawArgs.slice(2),
        }
    );
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        template: args._[0],
        runInstall: args['--install'] || false,
        projectName: args['--name'] || false,
    };
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'Angular';
    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate,
        };
    }

    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which framework to setup',
            choices: ['Angular',
                'React',
                'Vue',
                'Node(Express)',
                'Express&Jade',
                'Express&PUG',
                'Express&HBS',
                'Express&EJS'
            ],
            default: defaultTemplate,
        })
    }

    if (!options.projectName) {
        questions.push({
            type: 'input',
            name: 'projectName',
            message: 'What is the project name?',
            default: 'framework-project'
        })
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        projectName: options.projectName || answers.projectName,
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    await createProject(options);
}