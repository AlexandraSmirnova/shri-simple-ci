export type Status = 'succeded' | 'failed' | 'pending';

export interface Agent {
    host: string;
    port: string;
    taskId?: string;
}

export interface Build {
    id: string;
    commitHash: string;
    command: string;
    status: Status;
}