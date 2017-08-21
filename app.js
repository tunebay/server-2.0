import express from 'express';
import morgan from 'morgan';
import { Model } from 'objection';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import validator from 'express-validator';
import uid from 'uid-safe';
import session from 'express-session';
import './services/passport';
import customValidators from './services/middlewares/validators';
import routes from './routes/index.router';
import keys from './config/keys';
import knex from './db/knex';

require('dotenv').config();
global.Promise = require('bluebird');

Model.knex(knex);

const app = express();

// App set up
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

const corsConfig = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
};

app.use(
  session({
    genid(req) {
      return uid.sync(18); // use UUIDs for session IDs
    },
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(validator({ customValidators }));
app.use(passport.initialize());
app.use(passport.session());
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
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

export default app;
