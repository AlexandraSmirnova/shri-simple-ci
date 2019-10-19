  
import * as  express from 'express';
import { getFreeAgent, addTaskToBuild, runTaskOnAgent } from '../agentService';
import db from '../db';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        builds: db.get('builds').value(),
    });
});

router.get('/build', (req, res) => {
    res.render('build');
});

router.post('/build', (req, res) => {
    const { commitHash, command } = req.body;

    const agent = getFreeAgent();

    if (!agent) {
        res.render('index', {
            error: "There is no free agents. Please, run more agents",
            builds: db.get('builds').value(),
        });
        return;
    }

    const newTask = addTaskToBuild(agent, commitHash, command);
    runTaskOnAgent(agent, newTask);
    
    res.render('index', {
        builds: db.get('builds').value(),
    });
});

export default router;