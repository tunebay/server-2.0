import request from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import User from '../../models/user.model';
import { truncate, migrate, createUser } from '../helper';

describe('🚏 /users', () => {
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
});
