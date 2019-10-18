import * as  express from 'express';
import { startBuild } from './utils/buildService';
import { sendBuildResult } from './utils/server';


const router = express.Router();

router.post('/build', async (req, res) => {
    const { repo, id, commitHash, command } = req.body;
    const { stderr , stdout, status } =  await startBuild(repo, id, commitHash, command);

    sendBuildResult(stderr, stdout, status)
});

export default router;