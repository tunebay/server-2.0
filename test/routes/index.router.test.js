import request from 'supertest';
import app from '../../app';

describe('🚏 Index router "/"', () => {
  const INDEX_PATH = '/api/v1';

  describe('GET /', () => {
    test('connects to the API succesfully', (done) => {
      request(app).get(INDEX_PATH)
      .end((err, res) => {
        expect(res.body.message).toEqual('Tunebay API V1.0 connection ok');
        done();
      });
    });
  });
});
