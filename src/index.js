import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import api from './routes/api';

const log = console.log;
const app = express();
import config from '../package.json';

const port = config.port || 3000;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

log('Starting Mock Server');

app.use('/api', api);

// Not Found Routes
app.all('/*', (req, res)=>{
  res.status(401).send({message: 'Not authorized'})
});


const server = http.createServer(app);

server.listen(port, () => log(`App is served on port ${port}`))
