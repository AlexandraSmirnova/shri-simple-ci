import * as fs from 'fs';
import { BUILD_ROOT } from "../env";
import { clone, checkout, runCommand } from './commands';


export const startBuild = async (
    repo: string,
    id: string,
    commitHash: string,
    command: string
) => {
    if(!fs.existsSync(BUILD_ROOT)) {
        fs.mkdirSync(BUILD_ROOT);
    }

    const { stderr, stdout } = await clone(repo, id)
        .then(() => checkout(id, commitHash))
        .then(() => runCommand(id, command));

    console.log('STDERR', stderr);
    console.log('STDOUT', stdout);
}

