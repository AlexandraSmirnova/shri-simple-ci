import fetch from 'node-fetch';
import { SERVER_URL, HOST, PORT } from '../env';

export const registerOnServer = () => {
    return fetch(`${SERVER_URL}/notify_agent`, {
        method: 'post',
        body: JSON.stringify({ host: HOST, port: PORT }),
        headers: {'Content-Type': 'application/json'},
    })
    .catch((e) => {
        console.error('Cannot register on server: ', e);
        process.exit(-1);
    })
};

export const sendBuildResult = (
    stderr: string,
    stdout: string,
    status: number
) => {
    return fetch(`${SERVER_URL}/notify_build_result`, {
        method: 'post',
        body: JSON.stringify({ stderr, stdout, status }),
        headers: {'Content-Type': 'application/json'},
    })
    .catch((e) => {
        console.error('Cannot register on server: ', e);
        process.exit(-1);
    })
}