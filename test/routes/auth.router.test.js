import request from 'supertest';
import { expect } from 'chai';
import { truncate, migrate, seed } from '../helper';
import app from '../../app';
import User from '../../models/user.model';

describe('🚏 /auth', () => {
  const AUTH_PATH = '/api/v1/auth';

  beforeEach((done) => {
    truncate()
    .then(() => migrate()
    .then(() => seed()
    .then(() => done())));
  });

  afterEach((done) => {
    truncate().then(() => done());
  });

  describe('POST /register', () => {
    it('Creates and returns a new user', (done) => {
      request(app)
        .post(`${AUTH_PATH}/register`)
        .send({
          displayName: 'New User',
          email: 'newuser@user.com',
          username: 'newuser',
          password: 's3cr3t123'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('user');
          expect(res.body).to.have.property('token');
          expect(res.body.user.username).to.equal('newuser');
          expect(res.body.user.email).to.equal('newuser@user.com');
          expect(res.body.user).to.not.have.property('password');
          done();
        });
    });

    it('doesnt allow duplicate usernames', (done) => {
      request(app)
        .post(`${AUTH_PATH}/register`)
        .send({
          displayName: 'Imposter',
          email: 'mali@user.com', // unique email
          username: 'malimichael', // taken username, see seeds.
          password: 's3cr3t123'
        })
        .end((err, res) => {
          expect(res.body).not.to.have.property('token');
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('doesnt allow duplicate emails', (done) => {
      request(app)
        .post(`${AUTH_PATH}/register`)
        .send({
          displayName: 'Imposter',
          email: 'mali@tunebay.com', // taken email, see seeds.
          username: 'imsounique', // unique username
          password: 's3cr3t123'
        })
        .end((err, res) => {
          expect(res.body).not.to.have.property('token');
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('allows a user to log in with their username', (done) => {
      request(app)
        .post(`${AUTH_PATH}/login`)
        .send({
          emailOrUsername: 'malimichael',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          expect(res.body.user.username).to.equal('malimichael');
          expect(res.body.user.email).to.equal('mali@tunebay.com');
          expect(res.body.user.displayName).to.equal('Mali Michael');
          done();
        });
    });

    it('allows a user to log in with their email', (done) => {
      request(app)
        .post(`${AUTH_PATH}/login`)
        .send({
          emailOrUsername: 'mali@tunebay.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          expect(res.body.user.username).to.equal('malimichael');
          expect(res.body.user.email).to.equal('mali@tunebay.com');
          expect(res.body.user.displayName).to.equal('Mali Michael');
          done();
        });
    });

    it('does not authorize with bad credentials', (done) => {
      request(app)
        .post(`${AUTH_PATH}/login`)
        .send({
          emailOrUsername: 'mali@tunebay.com',
          password: 'badpassword'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('sets last login', (done) => {
      const today = new Date();
      request(app)
        .post(`${AUTH_PATH}/login`)
        .send({
          emailOrUsername: 'mali@tunebay.com',
          password: 'password123'
        })
        .end((err, res) => {
          User
            .query()
            .where('id', res.body.user.id)
            .first()
            .then((user) => {
              expect(user).to.be.instanceof(User);
              expect(user.last_login).to.be.equalDate(today);
              expect(user.last_login).to.be.afterDate(user.created_at);
              done();
            });
        });
    });
  });
});
