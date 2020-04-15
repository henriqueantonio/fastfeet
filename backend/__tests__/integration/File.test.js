import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('File', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a file', async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    expect(response.status).toBe(200);
  });
});
