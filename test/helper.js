import chai from 'chai';
import bcrypt from 'bcryptjs';
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
    created_at: '2017-01-19T16:39:57-08:00',
    last_login: '2017-01-22T16:39:57-08:00',
    password_hash: bcrypt.hashSync('password123')
  });
};

export const createPlaylist = () => {
  return knex('playlists').insert({
    user_id: 1,
    title: 'Alchemy',
    playlist_type: 'album',
    price: 8.99,
    number_of_tracks: 11,
    duration: 2580,
    can_pay_more: true,
    permalink: 'https://tunebay.com/malimichael/alchemy',
    artwork: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/artwork/85cd2abe-3a96-4d9c-91a2-b4cb066709c4',
    purchase_message: 'Thanks for the support',
    release_date: '2016-01-19T16:39:57-08:00',
    created_at: '2017-02-19T16:39:57-08:00'
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
