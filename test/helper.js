import chai from 'chai';
import bcrypt from 'bcryptjs';
import faker from 'faker';
import knex from '../db/knex';

chai.use(require('chai-json-schema'));
chai.use(require('chai-datetime'));

const tables = [
  'playlists',
  'users'
];

export const createUser = () => {
  return knex('users').insert({
    display_name: 'Mali Michael',
    username: 'malimichael',
    email: 'mali@tunebay.com',
    active: true,
    account_type: 'artist',
    created_at: faker.date.past(),
    last_login: faker.date.past(),
    password_hash: bcrypt.hashSync('password123')
  });
};

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
