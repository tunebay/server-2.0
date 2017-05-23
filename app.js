import express from 'express';
import morgan from 'morgan';
import { Model } from 'objection';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import routes from './routes/index.router';
import knex from './db/knex';

require('dotenv').config();
global.Promise = require('bluebird');

Model.knex(knex);

const app = express();

// App set up
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// const corsConfig = {
//   origin: 'http://localhost:8080',
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(validator());
app.use('/api/v1', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

export default app;
