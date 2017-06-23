import request from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import User from '../../models/user.model';
import { truncate, migrate, createUser, createPlaylist, createAnotherPlaylist } from '../helper';

describe('👨🏼‍💻 🚏 /users', () => {
  const USERS_PATH = '/api/v1/users';

  beforeEach((done) => {
    truncate()
    .then(() => migrate()
    .then(() => createUser()
    .then(() => done())));
  });

  afterEach((done) => {
    truncate().then(() => done());
  });

  describe('GET /', () => {
    it('gets all users', (done) => {
      request(app).get(USERS_PATH)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(1);
        done();
      });
    });

    it('contains users that match the jsonSchema', (done) => {
      request(app).get(USERS_PATH)
      .end((err, res) => {
        expect(res.body[0]).to.be.jsonSchema(User.jsonSchema);
        done();
      });
    });
  });

  describe('GET /:username', () => {
    it('Retrieves a single user by username', (done) => {
      request(app).get(`${USERS_PATH}/malimichael`)
      .end((err, res) => {
        expect(res.body.user).to.have.property('username', 'malimichael');
        expect(res.body.user).to.have.property('email', 'mali@tunebay.com');
        done();
      });
    });

    it('returns an error when no user is found', (done) => {
      request(app).get(`${USERS_PATH}/idontexist`)
      .end((err, res) => {
        expect(res.body).not.to.have.property('user');
        expect(res.body).to.have.property('error', 'user not found.');
        done();
      });
    });
  });

  describe('GET /id/:id', () => {
    it('Retrives a user based on their id', (done) => {
      request(app).get(`${USERS_PATH}/id/1`)
      .end((err, res) => {
        expect(res.body.user).to.have.property('username', 'malimichael');
        expect(res.body.user).to.have.property('email', 'mali@tunebay.com');
        done();
      });
    });
  });

  describe('GET /:username/playlists', () => {
    beforeEach((done) => {
      truncate()
      .then(() => migrate()
      .then(() => createUser()
      .then(() => createPlaylist()
      .then(() => done()))));
    });

    it('Retrieves a single user and their assosiated playlists', (done) => {
      request(app).get(`${USERS_PATH}/malimichael/playlists`)
      .end((err, res) => {
        expect(res.body.user).to.have.property('username', 'malimichael');
        expect(res.body.user).to.have.property('email', 'mali@tunebay.com');
        expect(res.body.user).to.have.property('playlists');
        expect(res.body.user.playlists[0]).to.have.property('numberOfTracks', 11);
        expect(res.body.user.playlists[0]).to.have.property('title', 'Alchemy');
        expect(res.body.user.playlists[0]).to.have.property('playlistType', 'album');
        done();
      });
    });

    it('users assosiated playlists have assosiated genres', (done) => {
      request(app).get(`${USERS_PATH}/malimichael/playlists`)
      .end((err, res) => {
        expect(res.body.user.playlists[0]).to.have.property('genres');
        expect(res.body.user.playlists[0].genres).to.be.an('array');
        done();
      });
    });

    it('returns an error when no user is found', (done) => {
      request(app).get(`${USERS_PATH}/idontexist/playlists`)
      .end((err, res) => {
        expect(res.body).not.to.have.property('user');
        expect(res.body).to.have.property('error', 'user not found.');
        done();
      });
    });

    it('orders the playlists in decending order', (done) => {
      createAnotherPlaylist()
      .then(() => {
        request(app).get(`${USERS_PATH}/malimichael/playlists`)
        .end((err, res) => {
          expect(res.body.user.playlists[0]).to.have.property('title', 'Afterlife EP');
          done();
        });
      });
    });
  });

  describe('GET /search?', () => {
    it('Retrieves a single user based on the query string', (done) => {
      request(app).get(`${USERS_PATH}/search?username=malimichael`)
      .end((err, res) => {
        expect(res.body.user).to.have.property('username', 'malimichael');
        expect(res.body.user).to.have.property('email', 'mali@tunebay.com');
        done();
      });
    });

    it('can query by email', (done) => {
      request(app).get(`${USERS_PATH}/search?email=mali@tunebay.com`)
      .end((err, res) => {
        expect(res.body.user).to.have.property('username', 'malimichael');
        expect(res.body.user).to.have.property('email', 'mali@tunebay.com');
        done();
      });
    });

    it('can query by id', (done) => {
      request(app).get(`${USERS_PATH}/search?id=1`)
      .end((err, res) => {
        expect(res.body.user).to.have.property('username', 'malimichael');
        expect(res.body.user).to.have.property('email', 'mali@tunebay.com');
        done();
      });
    });

    it('returns an error when no user is found', (done) => {
      request(app).get(`${USERS_PATH}/idontexists`)
      .end((err, res) => {
        expect(res.body).not.to.have.property('user');
        expect(res.body).to.have.property('error', 'user not found.');
        done();
      });
    });

    it('doesnt allow for invalid query params', (done) => {
      request(app).get(`${USERS_PATH}/search?name=malimichael`) // name invalid
      .end((err, res) => {
        expect(res.body).not.to.have.property('user');
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error', 'One or more query parameters are invalid.');
        done();
      });
    });
  });
});
