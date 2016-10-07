import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { port } from './config.json';
const log = console.log;
const app = express();

app.use(morgan('combined'));
app.use(cors());

log('Starting Node Express Application with Babel');

app.get('/', function (req, res) {
  res.send('hello, world!')
});

// Not Found Routes
app.all('/*', (req, res)=>{
  res.status(404).send({message: 'Not authorized'})
});


const server = http.createServer(app);

server.listen(port, () => log(`App is served on port ${port}`))
