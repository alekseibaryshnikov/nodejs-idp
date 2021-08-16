import request from "supertest";
import app from '../../../../index';
import { AuthorizationResponseError } from "../../../models/AuthorizationResponseError";

describe('authorization: password credentials flow', () => {
  test('should return token', done => {
    request(app)
      .post('/authorize')
      .set('Authorization', Buffer.from('testId:testSecret').toString('base64'))
      .field('grant_type','password')
      .field('username','test')
      .field('password','test')
      .field('scope','test')
      .expect(200, (res: Response) => {
        expect('access_token' in res.body!).toBeTruthy();
        expect('token_type' in res.body!).toBeTruthy();
        expect('expires_in' in res.body!).toBeTruthy();
        expect('refresh_token' in res.body!).toBeTruthy();
      })
      .end(done);
  });

  test('should return token', done => {
    request(app)
      .post('/authorize')
      .set('Authorization', Buffer.from('testId:testSecret').toString('base64'))
      .field('grant_type','password')
      .field('username','test')
      .field('password','test')
      .expect(200, (res: Response) => {
        expect('access_token' in res.body!).toBeTruthy();
        expect('token_type' in res.body!).toBeTruthy();
        expect('expires_in' in res.body!).toBeTruthy();
        expect('refresh_token' in res.body!).toBeTruthy();
      })
      .end(done);
  });

  test('should return error with "invalid_request: parameter username is missed"', done => {
    request(app)
      .post('/authorize')
      .set('Authorization', Buffer.from('testId:testSecret').toString('base64'))
      .field('grant_type','password')
      .field('password','test')
      .field('scope','test')
      .expect(400, (res: Response) => {
        const body = res.body as unknown as AuthorizationResponseError;
        expect(body.error.invalid_request).toBe('parameter username is missed');
      })
      .end(done);
  });

  test('should return error with "invalid_request: parameter password is missed"', done => {
    request(app)
      .post('/authorize')
      .set('Authorization', Buffer.from('testId:testSecret').toString('base64'))
      .field('grant_type','password')
      .field('username','test')
      .field('scope','test')
      .expect(400, (res: Response) => {
        const body = res.body as unknown as AuthorizationResponseError;
        expect(body.error.invalid_request).toBe('parameter password is missed');
      })
      .end(done);
  });

  test('should return 401 error', done => {
    request(app)
      .post('/authorize')
      .field('grant_type','password')
      .field('username','test')
      .field('password','test')
      .field('scope','test')
      .expect(401)
      .end(done);
  });
});