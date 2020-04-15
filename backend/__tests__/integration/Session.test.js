import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it("shouldn't be able to proceed if the user not exists", async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ email: 'nothing@nothing.com', password: 'nothing' });

    expect(response.status).toBe(400);
  });

  it("shouldn't be able to proceed if the user password not matchs", async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    const response = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: '123456' });

    expect(response.status).toBe(401);
  });

  it('should be able to make a session', async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    const response = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    expect(response.body).toHaveProperty('token');
  });
});
