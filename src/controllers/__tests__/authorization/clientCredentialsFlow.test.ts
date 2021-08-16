import request from "supertest";
import app from '../../../../index';

describe('authorization: client credentials flow', () => {
  test('should return token', done => {
    request(app)
      .post('/authorize')
      .set('Authorization', Buffer.from('testId:testSecret').toString('base64'))
      .field('grant_type','client_credentials')
      .expect(200, (res: Response) => {
        expect('access_token' in res.body!).toBeTruthy();
        expect('token_type' in res.body!).toBeTruthy();
        expect('expires_in' in res.body!).toBeTruthy();
      })
      .end(done);
  });

  test('should return token', done => {
    request(app)
      .post('/authorize')
      .set('Authorization', Buffer.from('testId:testSecret').toString('base64'))
      .field('grant_type','client_credentials')
      .expect(200, (res: Response) => {
        expect('access_token' in res.body!).toBeTruthy();
        expect('token_type' in res.body!).toBeTruthy();
        expect('expires_in' in res.body!).toBeTruthy();
      })
      .end(done);
  });

  test('should return 401 error', done => {
    request(app)
      .post('/authorize')
      .field('grant_type','client_credentials')
      .expect(401)
      .end(done);
  });
});