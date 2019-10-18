  
import * as  express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/build', (req, res) => {
    res.render('build');
});

router.post('/build', (req, res) => {
    console.log(req.body);
    res.render('index');
});

export default router;