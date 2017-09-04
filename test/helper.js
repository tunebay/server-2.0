import chai from 'chai';
import bcrypt from 'bcryptjs';
import knex from '../db/knex';

chai.use(require('chai-json-schema'));
chai.use(require('chai-datetime'));

const tables = ['playlists', 'users'];

export const createUser = () => {
  return knex('users').insert({
    display_name: 'Mali Michael',
    username: 'malimichael',
    email: 'mali@tunebay.com',
    active: true,
    account_type: 'artist',
    created_at: '2017-01-19T16:39:57-08:00',
    last_login: '2017-01-22T16:39:57-08:00',
    password_hash: bcrypt.hashSync('password123'),
    provider: 'email',
    pending: false,
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
    artwork:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/artwork/85cd2abe-3a96-4d9c-91a2-b4cb066709c4',
    purchase_message: 'Thanks for the support',
    release_date: '2016-01-19T16:39:57-08:00',
    created_at: '2017-02-19T16:39:57-08:00',
  });
};

export const createAnotherPlaylist = () => {
  return knex('playlists').insert({
    user_id: 1,
    title: 'Afterlife EP',
    playlist_type: 'EP',
    price: 3.99,
    number_of_tracks: 4,
    duration: 980,
    can_pay_more: true,
    permalink: 'https://tunebay.com/malimichael/afterlife',
    artwork:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/artwork/85cd2abe-3a96-4d9c-91a2-b4cb066709c4',
    purchase_message: 'Thanks for the support',
    release_date: '2016-01-19T16:39:57-08:00',
    created_at: '2017-02-27T16:39:57-08:00',
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

export const testTracks = [
  {
    name: 'Drive',
    duration: 191,
    playlistPosition: 1,
    single: true,
    price: 0.79,
    fileType: 'audio/wav',
    location:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/f096ab60-e56b-44d7-abd0-6356e9b08205',
  },
  {
    name: '2 Can Play At That Game',
    duration: 213,
    playlistPosition: 2,
    single: false,
    price: null,
    fileType: 'audio/mp3',
    location:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/e9ebcd3e-0cf2-43c1-950f-9dc280632f1d',
  },
  {
    name: 'Alchemy',
    duration: 227,
    playlistPosition: 3,
    single: true,
    price: 0.79,
    fileType: 'audio/mp3',
    location:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/0ea4b041-222f-41bf-a30a-f4ed45e0aec7',
  },
  {
    name: 'Another Man',
    duration: 234,
    playlistPosition: 4,
    single: false,
    price: null,
    fileType: 'audio/mp3',
    location:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/4ae6bf66-9c83-4633-aa3f-dd9852859b5d',
  },
  {
    name: 'Hans Melody',
    duration: 61,
    playlistPosition: 5,
    single: false,
    price: null,
    fileType: 'audio/mp3',
    location:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/e0589e43-624a-4650-ac37-52203abdf555',
  },
  {
    name: "(What Have I Got To Do) Now You're Gone",
    duration: 216,
    playlistPosition: 6,
    single: false,
    price: null,
    fileType: 'audio/mp3',
    location:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/930df7a2-28f6-4327-b6a8-c7739856a360',
  },
  {
    name: 'Is This Love',
    duration: 245,
    playlistPosition: 7,
    single: false,
    price: null,
    fileType: 'audio/mp3',
    location:
      'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/54/music/2549b3c6-f01a-415c-bdbc-3d187fc9e7d4',
  },
];
