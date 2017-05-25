import request from 'supertest';
import { expect } from 'chai';
import faker from 'faker';
import app from '../../app';
import { truncate, migrate, createUser } from '../helper';

const PLAYLIST_PATH = '/api/v1/playlists';

describe('💿 🚏 /playlists router', () => {
  beforeEach((done) => {
    truncate()
    .then(() => migrate()
    .then(() => createUser())
    .then(() => done()));
  });

  afterEach((done) => {
    truncate().then(() => done());
  });

  const playlist = {
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
    release_date: faker.date.past(),
    created_at: faker.date.past(),
  };

  describe('POST /playlists', () => {
    it('creates a new record in the database', (done) => {
      request(app)
        .post(PLAYLIST_PATH)
        .send(playlist)
        .end((err, res) => {
          console.log('RES', res.body);
          expect(res.body).to.have.property('title', 'Alchemy');
          done();
        });
    });
  });
});
