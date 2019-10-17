  
import * as express from 'express';
import * as path from 'path';
import agentRoutes from './routes/agent';
import clientRoutes from './routes/client';
import { PORT, HOST } from './env';

const app = express();

app.use(agentRoutes);
app.use(clientRoutes);

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(parseInt(PORT), HOST, () => {
    console.log(`Server have been started on ${HOST}:${PORT}`);
});