import request from 'supertest';
import { expect } from 'chai';
import { omit } from 'lodash';
import app from '../../app';
import { truncate, migrate, createUser } from '../helper';
import { generateToken } from '../../lib/auth';

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

  const token = generateToken({ id: 1 });

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
    createdAt: '2017-12-19T16:39:57-08:00',
    genreIds: [14, 33, 12]
  };

  describe('POST /playlists', () => {
    it('creates a new record in the database and returns a 201', (done) => {
      request(app)
        .post(PLAYLIST_PATH)
        .set('authorization', token)
        .send(playlist)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('playlist');
          expect(res.body.playlist).to.have.property('title', 'Alchemy');
          done();
        });
    });

    it('formats the response correctly', (done) => {
      request(app)
        .post(PLAYLIST_PATH)
        .set('authorization', token)
        .send(playlist)
        .end((err, res) => {
          expect(res.body.playlist).to.have.property('playlistType');
          expect(res.body.playlist).not.to.have.property('playlist_type');
          done();
        });
    });

    it('will not save the playlist without a required fields', (done) => {
      const badPlaylist = omit(playlist, 'title');
      request(app)
        .post(PLAYLIST_PATH)
        .set('authorization', token)
        .send(badPlaylist)
        .end((err, res) => {
          expect(res.body.errors).to.have.property('title');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('Saves a playlist and its genres', (done) => {
      request(app)
        .post(PLAYLIST_PATH)
        .set('authorization', token)
        .send(playlist)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.playlist).to.have.property('genres');
          expect(res.body.playlist.genres).to.be.an('array');
          done();
        });
    });

    it('It will not save if user is not authd', (done) => {
      request(app)
        .post(PLAYLIST_PATH)
        // User not auth'd without sending valid token
        // .set('authorization', token)
        .send(playlist)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).not.to.have.property('playlists');
          done();
        });
    });
  });
});
