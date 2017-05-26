import request from 'supertest';
import { omit } from 'lodash';
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
    userId: 1,
    title: 'Alchemy',
    playlistType: 'album',
    price: 8.99,
    numberOfTracks: 11,
    duration: 2580,
    canPayMore: true,
    permalink: 'https://tunebay.com/malimichael/alchemy',
    artwork: 'https://tunebay-upload.s3-eu-west-2.amazonaws.com/users/artwork/85cd2abe-3a96-4d9c-91a2-b4cb066709c4',
    purchaseMessage: 'Thanks for the support',
    releaseDate: '2017-12-19T16:39:57-08:00',
    createdAt: '2017-12-19T16:39:57-08:00'
  };

  describe('POST /playlists', () => {
    test('creates a new record in the database and returns a 201', (done) => {
      request(app)
        .post(PLAYLIST_PATH)
        .send(playlist)
        .end((err, res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('playlist');
          expect(res.body.playlist).toHaveProperty('title', 'Alchemy');
          done();
        });
    });

    test('formats the response correctly', (done) => {
      request(app)
        .post(PLAYLIST_PATH)
        .send(playlist)
        .end((err, res) => {
          expect(res.body.playlist).toHaveProperty('playlistType');
          expect(res.body.playlist).not.toHaveProperty('playlist_type');
          done();
        });
    });

    test('will not save the playlist without a required fields', (done) => {
      const badPlaylist = omit(playlist, 'title');
      request(app)
        .post(PLAYLIST_PATH)
        .send(badPlaylist)
        .end((err, res) => {
          expect(res.body.error.message).toMatch('should have required property \'title\'');
          expect(res.status).toEqual(500);
          done();
        });
    });
  });
});
