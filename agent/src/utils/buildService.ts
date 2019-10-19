import * as fs from 'fs';
import { BUILD_ROOT } from "../env";
import { clone, checkout, runCommand } from './commands';


export const startBuild = (
    repo: string,
    id: string,
    commitHash: string,
    command: string
) => {
    if(!fs.existsSync(BUILD_ROOT)) {
        fs.mkdirSync(BUILD_ROOT);
    }

    return clone(repo, id)
        .then(() => checkout(id, commitHash))
        .then(() => runCommand(id, command))
        .catch((res) => ({
            stderr: res.stderr ? res.stderr : 'Could not clone repository',
            stdout: '',
            status: 'failed'
        }));
}

