import { Agent } from "./types";

export const checkAgent = (host: string, port: string) => (agent: Agent) => 
    agent.host === host && agent.port === port;