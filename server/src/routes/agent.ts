  
import * as  express from 'express';
import db from '../db';

const router = express.Router();

router.post('/notify_agent', (req, res) => {
    const { host, port } = req.body;

    if (!(host && port)) {
        res.status(400).send('Host and port are required!');
        return;
    }

    const agents = db.get('agents').value();
    agents.push({ host, port });

    db.write();
    
    console.log(`Agent registered on ${host}:${port}`);
    res.sendStatus(200);
});

router.get('/notify_build_result', (req, res) => {
    res.send('Hello build');
});


export default router;