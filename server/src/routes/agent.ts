  
import * as  express from 'express';

const router = express.Router();

router.get('/notify_agent', (req, res) => {
    res.send('Hello build');
});

router.get('/notify_build_result', (req, res) => {
    res.send('Hello build');
});


export default router;