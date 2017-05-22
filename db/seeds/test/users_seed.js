const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = (knex) => {
  return knex('users').truncate() // Deletes ALL existing entries and restart sequence
    .then(() => { // Inserts seed entries one by one in series
      // 1
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
    })
    .then(() => {
      // 2
      return knex('users').insert({
        display_name: 'General Roots',
        username: 'generalroots',
        email: 'generalroots@gmail.com',
        active: true,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('jahroots123')
      });
    })
    .then(() => {
      // 3
      return knex('users').insert({
        display_name: 'Rude Health',
        username: 'rudehealth',
        email: 'rudehealth@gmail.com',
        active: true,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 4
      return knex('users').insert({
        display_name: 'Minx',
        username: 'minx',
        email: 'minx@gmail.com',
        active: true,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 5
      return knex('users').insert({
        display_name: 'Olivia Luttrell',
        username: 'livluttrell',
        email: 'liv@gmail.com',
        active: true,
        account_type: 'fan',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 6
      return knex('users').insert({
        display_name: 'Matt Cardiff',
        username: 'bardiff',
        email: 'matt@gmail.com',
        active: false,
        account_type: 'fan',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 7
      return knex('users').insert({
        display_name: 'Ezra Bruno',
        username: 'ezrabruno',
        email: 'ezra@gmail.com',
        active: false,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 8
      return knex('users').insert({
        display_name: 'Maverick Sabre',
        username: 'mavericksabre',
        email: 'mav@gmail.com',
        active: false,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 9
      return knex('users').insert({
        display_name: 'The Keepsakes',
        username: 'thekeepsakes',
        email: 'keepsakes@gmail.com',
        active: false,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 10
      return knex('users').insert({
        display_name: 'Mabel',
        username: 'mabel',
        email: 'mabel@gmail.com',
        active: true,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 11
      return knex('users').insert({
        display_name: 'Liam Bailey',
        username: 'liambailey',
        email: 'liam@gmail.com',
        active: true,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    })
    .then(() => {
      // 12
      return knex('users').insert({
        display_name: 'George The Poet',
        username: 'georgethepoet',
        email: 'george@gmail.com',
        active: true,
        account_type: 'artist',
        created_at: faker.date.past(),
        last_login: faker.date.past(),
        password_hash: bcrypt.hashSync('password123')
      });
    });
};
