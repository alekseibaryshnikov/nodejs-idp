import request from "supertest";
import app from '../../../../index';

/**
 * There are no error tests because they are the same as in auth code flow.
 * Look at them in the auth code flow tests suits.
 */
describe('authorization: implicit flow', () => {
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
});