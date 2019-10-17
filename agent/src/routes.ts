  
import * as  express from 'express';

const router = express.Router();

router.post('/build', (req, res) => {
    res.send('Hello build');
});

export default router;