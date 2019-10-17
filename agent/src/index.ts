  
import * as express from 'express';
import routes from './routes';
import { PORT, HOST } from './env';

const app = express();

app.use(routes);

app.listen(parseInt(PORT), HOST, () => {
    console.log(`Agent have been started on ${HOST}:${PORT}`);
});