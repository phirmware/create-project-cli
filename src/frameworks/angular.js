import execa from 'execa';

export async function angular(options) {
    const result = await execa('ng', ['new', `${options.projectName}`], {
        cwd: options.currentDirectory
    });

    if (result.failed) {
        return Promise.reject(new Error('Failed to setup'));
    }
    return;
}