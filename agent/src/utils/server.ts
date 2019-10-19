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
    id: string,
    stderr: string,
    stdout: string,
    status: string
) => {
    return fetch(`${SERVER_URL}/notify_build_result`, {
        method: 'post',
        body: JSON.stringify({ id, stderr, stdout, status }),
        headers: {'Content-Type': 'application/json'},
    })
    .catch((e) => {
        console.error('Cannot send to server: ', e);
        process.exit(-1);
    })
}