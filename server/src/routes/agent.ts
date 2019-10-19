  
import * as  express from 'express';
import db from '../db';
import { checkAgent } from '../utils';
import { saveBuildResult } from '../agentService';


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
        console.info(`Agent has already registered on ${host}:${port}`);
        res.sendStatus(200);
        return   
    }
    
    agents.push({ host, port });

    db.write();
    
    console.info(`Agent registered on ${host}:${port}`);
    res.sendStatus(200);
});

router.post('/notify_build_result', (req, res) => {
    const { id, stderr, stdout, status } = req.body;

    if (!id) {
        res.sendStatus(404);
    }

    saveBuildResult(id, stderr, stdout, status);
});


export default router;