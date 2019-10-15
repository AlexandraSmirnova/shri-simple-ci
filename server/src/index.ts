  
import * as express from 'express';
import * as path from 'path';
import agentRoutes from './routes/agent';
import clientRoutes from './routes/client';

const app = express();

app.use(agentRoutes);
app.use(clientRoutes);

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3060, () => {
    console.log('Example app listening on port 3060!');
});