import request from 'supertest';
import { expect } from 'chai';
import app from '../../app';
import User from '../../models/user.model';
import knex from '../../db/knex';

describe('🚏 /users', () => {
  const USERS_PATH = '/api/v1/users';

  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => knex.seed.run() // seeds 12 users
      .then(() => done()));
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => done());
  });

  describe('GET /', () => {
    it('gets all users', (done) => {
      request(app).get(USERS_PATH)
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(12);
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
