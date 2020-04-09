import execa from 'execa';

export async function react(options) {
    const result = await execa('npx', ['create-react-app', `${options.projectName}`], {
        cwd: options.currentDirectory
    });

    if (result.failed) {
        return Promise.reject(new Error('Failed to setup vue'));
    }
    return;
}