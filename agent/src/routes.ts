import * as  express from 'express';
import { startBuild } from './utils/buildService';
import { sendBuildResult } from './utils/server';


const router = express.Router();

router.post('/build', async (req, res) => {
    console.log('received', req.body);
    const { repo, id, commitHash, command } = req.body;
    
    startBuild(repo, id, commitHash, command)
        .then((result) => {
            const { stderr, stdout, status } = result;
            sendBuildResult(id, stderr, stdout, status)
        });
    

    res.sendStatus(200);
});

export default router;