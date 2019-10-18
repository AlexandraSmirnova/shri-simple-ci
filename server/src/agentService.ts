import db from "./db";
import { Agent } from "./types";


// export const runTaskOnAgent = (agent, task) => {

// } 

export const addTaskToBuild = (agent: Agent, commitHash: string, command: string) => {
    const builds = db.get('builds').value();

    let id: number = 1; 
    if (builds.length > 0) {
        id = Number(builds[builds.length - 1].id) + 1;
    }

    builds.push({ id: id.toString(), commitHash, command, status: 'pending' });
    agent.taskId = id.toString();
    db.write();
}

export const getFreeAgent = (): Agent | null => {
    const agents: any = db.get('agents')
    const freeAgents = agents.filter((agent: Agent) => !agent.taskId).value();

    return freeAgents.length ? freeAgents[0] : null;
}