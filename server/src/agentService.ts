import db from "./db";
import { Agent, Build } from "./types";
import { REPO_ADRESS } from "./env";
import fetch from "node-fetch";


const MAX_WAITING_AGENT = 3 * 60 * 1000; //3 min

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
    }).catch((e) => removeAgent(agent, e as string))
    .then(() => {
        setTimeout(() => {
            const agents: any = db.get('agents');

            const updatedAgent = agents.find(agent).value();

            if (updatedAgent.taskId) {
                removeAgent(agent);
            }
        }, MAX_WAITING_AGENT)
    }) 
}

export const addTaskToBuild = (agent: Agent, commitHash: string, command: string): Build => {
    const builds = db.get('builds').value();

    let id: number = 1;
    if (builds.length > 0) {
        id = Number(builds[builds.length - 1].id) + 1;
    }
    const newBuild: Build = { 
        id: id.toString(),
        commitHash, command,
        status: 'pending',
        started: Date.now()
    };

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

export const removeAgent = (agent: Agent, reason = "Sorry, agent died") => {
    const agents: any = db.get('agents');
    
    agents.remove(agent)

    if (agent.taskId) {
        const builds: any = db.get('builds');
        const build = builds.find({ id: agent.taskId }).value();

        build.status = 'failed';
        build.stderr = reason;
    }   

    db.write();
    console.info(`Agent removed ${agent.host}:${agent.port}`)
}

export const saveBuildResult = (
    id: string,
    stderr: string,
    stdout: string,
    status: string,
) => {
    const builds: any = db.get('builds');
    const build = builds.find({ id: id }).value();
    
    if (!build) {
        return;
    }

    build.status = status;
    build.stderr = stderr;
    build.stdout = stdout;
    build.finished = Date.now();

    const agents: any = db.get('agents')
    const agent = agents.find({ taskId: id }).value();
    agent.taskId = '';
    db.write();
}