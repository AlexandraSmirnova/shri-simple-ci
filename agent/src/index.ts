  
import * as express from 'express';
import routes from './routes';
import { PORT, HOST } from './env';
import { registerOnServer } from './utils/serverService';

const app = express();

app.use(routes);

registerOnServer();

app.listen(parseInt(PORT), HOST, () => {
    console.log(`Agent have been started on ${HOST}:${PORT}`);
});