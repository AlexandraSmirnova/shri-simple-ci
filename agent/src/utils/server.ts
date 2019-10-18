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