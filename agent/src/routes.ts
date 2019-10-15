  
import * as  express from 'express';

const router = express.Router();

router.get('/build', (req, res) => {
    res.send('Hello build');
});

export default router;