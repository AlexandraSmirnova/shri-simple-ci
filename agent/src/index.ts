  
import * as express from 'express';
import routes from './routes';
import { PORT, HOST } from './env';
import { registerOnServer } from './utils/server';

const app = express();

app.use(routes);

app.listen(parseInt(PORT), HOST, () => {
    registerOnServer();
    console.log(`Agent have been started on ${HOST}:${PORT}`);
});