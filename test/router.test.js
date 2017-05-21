import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

const API = '/api/v1';

describe('🚏 router', () => {
  describe('#GET /', () => {
    it('connects to the API succesfully', (done) => {
      request(app).get(API)
      .end((err, res) => {
        expect(res.body.message).to.equal('Tunebay API V1.0 connection ok');
        done();
      });
    });
  });
});
