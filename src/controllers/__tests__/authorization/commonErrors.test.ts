import request from "supertest";
import app from "../../../..";
import { AuthorizationResponseError } from "../../../models/AuthorizationResponseError";

describe('authorization: common errors', () => {
  test('missing query param: response_type & should return error "invalid_request"', done => {
    request(app)
      .get('/authorize')
      .query({
        client_id: 'test',
        redirect_uri: 'http://test',
        scope: 'test',
        state: 'test'
      })
      .expect(400, (res: Response) => {
        const body = res.body as unknown as AuthorizationResponseError;
        expect(body.error.invalid_request).toBe('parameter response_type is missed');
      })
      .end(done);
  });

  test('should return error with "invalid_request: parameter grant_type is missed"', done => {
    request(app)
      .post('/authorize')
      .set('Authorization', Buffer.from('testId:testSecret').toString('base64'))
      .field('username','test')
      .field('password','test')
      .field('scope','test')
      .expect(400, (res: Response) => {
        const body = res.body as unknown as AuthorizationResponseError;
        expect(body.error.invalid_request).toBe('parameter grant_type is missed');
      })
      .end(done);
  });
});