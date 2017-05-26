import request from 'supertest';
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
    test('gets all users', (done) => {
      request(app).get(USERS_PATH)
      .end((err, res) => {
        expect(typeof res.body).toBe('array');
        expect(res.body.length).toEqual(1);
        done();
      });
    });

    // test('contains users that match the jsonSchema', (done) => {
    //   request(app).get(USERS_PATH)
    //   .end((err, res) => {
    //     expect(res.body[0]).to.be.jsonSchema(User.jsonSchema);
    //     done();
    //   });
    // });
  });
});
