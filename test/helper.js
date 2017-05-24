import chai from 'chai';
import knex from '../db/knex';

chai.use(require('chai-json-schema'));
chai.use(require('chai-datetime'));

const tables = [
  'users'
];

export const truncate = () => {
  return Promise.each(tables, (table) => {
    return knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
  });
};

export const migrate = () => {
  return knex.migrate.latest();
};

export const seed = () => {
  return knex.seed.run();
};
