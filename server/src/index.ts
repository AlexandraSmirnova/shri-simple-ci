  
import * as express from 'express';
import * as path from 'path';
import agentRoutes from './routes/agent';
import clientRoutes from './routes/client';
import { PORT, HOST, REPO_ADRESS } from './env';
import * as bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(agentRoutes);
app.use(clientRoutes);

app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(parseInt(PORT), HOST, () => {
    console.info(`Server have been started on ${HOST}:${PORT}`);
    console.info(`Repository: ${REPO_ADRESS}`)
});