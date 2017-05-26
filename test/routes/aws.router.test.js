import request from 'supertest';
import v4 from 'uuid';
import app from '../../app';

describe('🚏 /aws', () => {
  const AWS_PATH = '/api/v1/aws';

  describe('/s3/sign', () => {
    const filename = `users/music/${v4()}`;

    test('sends back a signed URL on request', (done) => {
      request(app)
        .get(`${AWS_PATH}/s3/sign`)
        .query({ filename, filetype: 'audio/mp3' })
        .end((err, res) => {
          expect(res.body).toHaveProperty('signedURL');
          expect(res.body.signedURL).toMatch(filename);
          done();
        });
    });
  });
});
