  
import * as  express from 'express';
import db from '../db';
import { Agent } from '../types';
import { checkAgent } from '../utils';


const router = express.Router();

router.post('/notify_agent', (req, res) => {
    const { host, port } = req.body;

    if (!(host && port)) {
        res.status(400).send('Host and port are required!');
        return;
    }

    const agents = db.get('agents').value();
    const checkIfAgentExists = checkAgent(host, port);

    if (agents.some(checkIfAgentExists)) {
        console.log(`Agent has already registered on ${host}:${port}`);
        res.sendStatus(200);
        return   
    }
    
    agents.push({ host, port });

    db.write();
    
    console.log(`Agent registered on ${host}:${port}`);
    res.sendStatus(200);
});

router.get('/notify_build_result', (req, res) => {
    res.send('Hello build');
});


export default router;