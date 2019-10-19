import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { BUILD_ROOT } from '../env';

const execWrapper = (
    command: string,
    path: string,
) => {
    const options = {
        cwd: path,
        env: { GIT_TERMINAL_PROMPT: '0' }
    };

    return promisify(exec)(command, options);
};


export const clone = async (url: string, id: string) => {
    await execWrapper(`git clone ${url} ${id}`, BUILD_ROOT);
}

export const checkout = (id: string, commitHash: string) => {
    const pathToBuild = path.join(BUILD_ROOT, id);

    return execWrapper(`git checkout --detach ${commitHash}`, pathToBuild);
}

export const runCommand = async (id: string, command: string) => {
    const pathToBuild = path.join(BUILD_ROOT, id);

    return execWrapper(command, pathToBuild)
        .then((res) => ({
            ...res,
            status: 'succeed',
        }))
        .catch((err) => ({
            stderr: err.stderr ? err.stderr : 'Could not run command',
            stdout: '',
            status: 'failed',
        }));
};
