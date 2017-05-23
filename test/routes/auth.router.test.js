import request from 'supertest';
import { expect } from 'chai';
import { truncate, migrate, seed } from '../helper';
import app from '../../app';

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
  });
});
