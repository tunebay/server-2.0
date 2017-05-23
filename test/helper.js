import chai from 'chai';
import knex from '../db/knex';

chai.use(require('chai-json-schema'));

const tables = [
  'users'
];

const truncate = () => {
  return Promise.each(tables, (table) => {
    return knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
  });
};

if (process.env.NODE_ENV === 'test') {
  beforeEach((done) => {
    truncate()
    .then(() => {
      knex.migrate.latest()
      .then(() => knex.seed.run() // seeds 12 users
      .then(() => done()));
    });
  });

  afterEach((done) => {
    truncate().then(() => done());
  });
}
