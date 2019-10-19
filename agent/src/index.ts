  
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import { PORT, HOST } from './env';
import { registerOnServer } from './utils/server';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(routes);

app.listen(parseInt(PORT), HOST, () => {
    registerOnServer();
    console.info(`Agent have been started on ${HOST}:${PORT}`);
});