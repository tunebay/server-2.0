import request from 'supertest';
import { truncate, createUser, migrate } from '../helper';
import app from '../../app';
// import User from '../../models/user.model';

describe('🚏 /auth', () => {
  const AUTH_PATH = '/api/v1/auth';

  beforeEach((done) => {
    truncate()
    .then(() => migrate()
    .then(() => createUser()
    .then(() => done())));
  });

  afterEach((done) => {
    truncate().then(() => done());
  });

  describe('POST /register', () => {
    test('Creates and returns a new user', (done) => {
      request(app)
        .post(`${AUTH_PATH}/register`)
        .send({
          displayName: 'New User',
          email: 'newuser@user.com',
          username: 'newuser',
          password: 's3cr3t123'
        })
        .end((err, res) => {
          expect(res.body).toHaveProperty('user');
          expect(res.body).toHaveProperty('token');
          expect(res.body.user.username).toEqual('newuser');
          expect(res.body.user.email).toEqual('newuser@user.com');
          expect(res.body.user).not.toHaveProperty('password');
          done();
        });
    });

    test('doesnt allow duplicate usernames', (done) => {
      request(app)
        .post(`${AUTH_PATH}/register`)
        .send({
          displayName: 'Imposter',
          email: 'mali@user.com', // unique email
          username: 'malimichael', // taken username
          password: 's3cr3t123'
        })
        .end((err, res) => {
          expect(res.body).not.toHaveProperty('token');
          expect(res.body).toHaveProperty('error');
          done();
        });
    });

    test('doesnt allow duplicate emails', (done) => {
      request(app)
        .post(`${AUTH_PATH}/register`)
        .send({
          displayName: 'Imposter',
          email: 'mali@tunebay.com', // taken email
          username: 'imsounique', // unique username
          password: 's3cr3t123'
        })
        .end((err, res) => {
          expect(res.body).not.toHaveProperty('token');
          expect(res.body).toHaveProperty('error');
          done();
        });
    });
  });

  describe('POST /login', () => {
    test('allows a user to log in with their username', (done) => {
      request(app)
        .post(`${AUTH_PATH}/login`)
        .send({
          emailOrUsername: 'malimichael',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res.body).toHaveProperty('token');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.username).toEqual('malimichael');
          expect(res.body.user.email).toEqual('mali@tunebay.com');
          expect(res.body.user.displayName).toEqual('Mali Michael');
          done();
        });
    });

    test('allows a user to log in with their email', (done) => {
      request(app)
        .post(`${AUTH_PATH}/login`)
        .send({
          emailOrUsername: 'mali@tunebay.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res.body).toHaveProperty('token');
          expect(res.body).toHaveProperty('user');
          expect(res.body.user.username).toEqual('malimichael');
          expect(res.body.user.email).toEqual('mali@tunebay.com');
          expect(res.body.user.displayName).toEqual('Mali Michael');
          done();
        });
    });

    test('does not authorize with bad credentials', (done) => {
      request(app)
        .post(`${AUTH_PATH}/login`)
        .send({
          emailOrUsername: 'mali@tunebay.com',
          password: 'badpassword'
        })
        .end((err, res) => {
          expect(res.status).toEqual(401);
          done();
        });
    });

    // test('sets last login', (done) => {
    //   const today = new Date();
    //   request(app)
    //     .post(`${AUTH_PATH}/login`)
    //     .send({
    //       emailOrUsername: 'mali@tunebay.com',
    //       password: 'password123'
    //     })
    //     .end((err, res) => {
    //       User
    //         .query()
    //         .where('id', res.body.user.id)
    //         .first()
    //         .then((user) => {
    //           expect(user).to.be.instanceof(User);
    //           expect(user.last_login).to.beEDate(today);
    //           expect(user.last_login).to.be.afterDate(user.created_at);
    //           done();
    //         });
    //     });
    // });
  });

  describe('POST /usernamecheck', () => {
    test('returns success if username is not taken', (done) => {
      request(app)
        .post(`${AUTH_PATH}/usernamecheck`)
        .send({ username: 'imsounique' })
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.message).toEqual('success');
          done();
        });
    });

    test('returns a failure if the username is taken', (done) => {
      request(app)
        .post(`${AUTH_PATH}/usernamecheck`)
        .send({ username: 'malimichael' })
        .end((err, res) => {
          expect(res.body.message).toEqual('Username is not available.');
          done();
        });
    });

    test('returns a failure if the username is reserved', (done) => {
      request(app)
        .post(`${AUTH_PATH}/usernamecheck`)
        .send({ username: 'login' })
        .end((err, res) => {
          expect(res.body.message).toEqual('Username is reserved.');
          done();
        });
    });
  });

  describe('POST /emailcheck', () => {
    test('returns success if email is not taken', (done) => {
      request(app)
        .post(`${AUTH_PATH}/emailcheck`)
        .send({ email: 'unique@email.com' })
        .end((err, res) => {
          expect(res.body.message).toEqual('success');
          done();
        });
    });

    test('returns a failure if the email is taken', (done) => {
      request(app)
        .post(`${AUTH_PATH}/emailcheck`)
        .send({ email: 'mali@tunebay.com' })
        .end((err, res) => {
          expect(res.body.message).toEqual('Email already in use.');
          done();
        });
    });
  });
});
