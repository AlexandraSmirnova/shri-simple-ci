import db from "./db";
import { Agent, Build } from "./types";
import { REPO_ADRESS } from "./env";
import fetch from "node-fetch";


export const runTaskOnAgent = (agent: Agent, task: Build) => {
    const { host, port } = agent;
    const { id, commitHash, command } = task;

    return fetch(`http://${host}:${port}/build`, {
        method: 'post',
        body: JSON.stringify({
            repo: REPO_ADRESS,
            id,
            commitHash,
            command
        }),
        headers: { 'Content-Type': 'application/json' },
    }).catch((e) => console.error('err', e)) // как обрабатывать будем?
}

export const addTaskToBuild = (agent: Agent, commitHash: string, command: string): Build => {
    const builds = db.get('builds').value();

    let id: number = 1;
    if (builds.length > 0) {
        id = Number(builds[builds.length - 1].id) + 1;
    }
    const newBuild: Build = { id: id.toString(), commitHash, command, status: 'pending' };

    builds.push(newBuild);
    agent.taskId = id.toString();
    db.write();

    return newBuild;
}

export const getFreeAgent = (): Agent | null => {
    const agents: any = db.get('agents');
    const freeAgents = agents.filter((agent: Agent) => !agent.taskId).value();

    return freeAgents.length ? freeAgents[0] : null;
}