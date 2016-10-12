import http from 'http';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const log = console.log;
const app = express();
import { port } from '../package.json';

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

log('Starting Mock Server');

app.post('/api', (req, res) => {
  log(req.body);
  const { body:data } = req;
  res.send({ response: 'OK', data });
})

// Not Found Routes
app.all('/*', (req, res)=>{
  res.status(401).send({message: 'Not authorized'})
});


const server = http.createServer(app);

server.listen(port, () => log(`App is served on port ${port}`))
