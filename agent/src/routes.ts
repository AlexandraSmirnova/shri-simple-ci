import * as  express from 'express';
import { startBuild } from './utils/buildService';


const router = express.Router();

router.post('/build', (req, res) => {
    const { repo, id, commitHash, command } = req.body;
    startBuild(repo, id, commitHash, command);
});

export default router;