import execa from 'execa';

export async function vue(options) {
    try {
        const result = await execa('vue', ['create', `${options.projectName}`, '-d'], {
            cwd: options.currentDirectory
        });


        if (result.failed) {
            return Promise.reject(new Error('Failed to setup vue'));
        }
        return;
    } catch (error) {
        return Promise.reject(new Error('Failed to setup vue'));
    }
}
