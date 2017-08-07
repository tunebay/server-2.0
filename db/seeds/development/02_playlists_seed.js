const faker = require('faker');

exports.seed = (knex) => {
  return knex('playlists')
    .del()
    .then(() => knex.raw('ALTER SEQUENCE playlists_id_seq RESTART WITH 1'))
    .then(() => {
      // Inserts seed entries one by one in series
      // 1
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
        release_date: faker.date.past(),
        created_at: faker.date.past(),
      });
    })
    .then(() => {
      // 2
      return knex('playlists').insert({
        user_id: 1,
        title: 'Afterlife EP',
        playlist_type: 'EP',
        price: 0.0,
        number_of_tracks: 4,
        duration: 982,
        can_pay_more: true,
        permalink: 'https://tunebay.com/malimichael/afterlife-ep',
        release_date: faker.date.past(),
        created_at: faker.date.past(),
      });
    });
};
