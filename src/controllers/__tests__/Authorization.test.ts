import request from "supertest";
import app from '../../../index';
import { AuthorizationResponseError } from "../../models/AuthorizationResponseError";

describe('authorization endpoint test', () => {
  /**
  * This section describes testing of AuthorizationController for authorization code flow
  */
  describe('authorization code flow', () => {
    describe('testing authorization code grant with GET method', () => {
      test('should return authentication form', done => {
        request(app)
          .get('/authorize')
          .query({
            response_type: 'code',
            client_id: 'test',
            redirect_uri: 'http://test',
            scope: 'test',
            state: 'test'
          })
          .expect(200)
          .expect('Location', /authorize/)
          .end(done);
      });
  
      test('should return authentication form (no state)', done => {
        request(app)
          .get('/authorize')
          .query({
            response_type: 'code',
            client_id: 'test',
            redirect_uri: 'http://test',
            scope: 'test'
          })
          .expect(200)
          .expect('Location', /authorize/)
          .end(done);
      });

      test('should return authentication form (implicit)', done => {
        request(app)
          .get('/authorize')
          .query({
            response_type: 'token',
            client_id: 'test',
            redirect_uri: 'http://test',
            scope: 'test'
          })
          .expect(200)
          .expect('Location', /authorize/)
          .end(done);
      });
  
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
  
      test('missing query param: client_id & should return error "invalid_request"', done => {
        request(app)
          .get('/authorize')
          .query({
            response_type: 'code',
            redirect_uri: 'http://test',
            scope: 'test',
            state: 'test'
          })
          .expect(400, (res: Response) => {
            const body = res.body as unknown as AuthorizationResponseError;
            expect(body.error.invalid_request).toBe('parameter client_id is missed');
          })
          .end(done);
      });
  
      test('missing query param: redirect_uri & should return error "invalid_request"', done => {
        request(app)
          .get('/authorize')
          .query({
            response_type: 'code',
            client_id: 'test',
            scope: 'test',
            state: 'test'
          })
          .expect(400, (res: Response) => {
            const body = res.body as unknown as AuthorizationResponseError;
            expect(body.error.invalid_request).toBe('parameter redirect_uri is missed');
          })
          .end(done);
      });
    });
  });

  describe('implicit flow', () => {

  });
});