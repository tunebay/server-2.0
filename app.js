import express from 'express';
import morgan from 'morgan';
import { Model } from 'objection';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import validator from 'express-validator';
import redis from 'redis';
import session from 'express-session';
import './services/passport';
import customValidators from './services/middlewares/validators';
import routes from './routes/index.router';
import keys from './config/keys';
import knex from './db/knex';

const RedisStore = require('connect-redis')(session);
const graphqlHTTP = require('express-graphql');
const GraphQLSchema = require('./graphql/schema/schema');

require('dotenv').config();
global.Promise = require('bluebird');

const redisClient = redis.createClient();

Model.knex(knex);

const app = express();

// App set up
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

const corsConfig = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
};

app.use(
  session({
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      client: redisClient
    }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: keys.SESSION_SECRET,
    maxAge: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false
  })
);
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(validator({ customValidators }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', routes);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: GraphQLSchema,
    graphiql: true
  })
);

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
