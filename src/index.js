import http from 'http';
import express from 'express';
import session from 'express-session';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

import api from './routes/api';
import config from './config.json';

const log = console.log;
const app = express();
const port = config.port || 3000;

mongoose.connect(`mongodb://${config.dbconn}`);

app.use(session({
    secret: 'node',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(passport.initialize());
app.use(passport.session());

log('Starting Mock Server');

app.use('/api', api);

// Not Found Routes
app.all('/*', (req, res)=>{
  res.status(401).send({message: 'Not authorized'})
});


const server = http.createServer(app);

server.listen(port, () => log(`App is served on port ${port}`))
