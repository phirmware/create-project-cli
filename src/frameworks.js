import download from 'download-git-repo';
import chalk from 'chalk';

function setUp(options) {
    return new Promise((resolve, reject) => {
        download(`phirm-dev/${options.template}-starter-template`, options.targetDirectory, function (err) {
            if (err) {
                reject(err);
                console.error(`%s Something went wrong, ${err}`, chalk.red.bold('ERROR'));
                process.exit(1);
            }
            resolve('DONE');
            console.log('%s  Setup Complete', chalk.green.bold('SUCCESS'));
        });
    })
}


// export async function angular(options) {
//     await setUp(options);
//     return;
// }

// export async function react(options) {
//     await setUp(options);
//     return;
// }

export async function setUpFramework(options) {
    await setUp(options);
    return;
}
