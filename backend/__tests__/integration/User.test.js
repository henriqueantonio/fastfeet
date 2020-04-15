import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.body).toHaveProperty('id');
  });

  it('should be able to avoid registration with duplicate emails', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it("shouldn't be able to change for an email that already exists", async () => {
    const userFac = await factory.attrsMany('User', 2);

    await request(app)
      .post('/users')
      .send(userFac[0]);

    await request(app)
      .post('/users')
      .send(userFac[1]);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac[0].email, password: userFac[0].password });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({
        email: userFac[1].email,
      });

    expect(response.status).toBe(400);
  });

  it("should'nt update if de password not match's", async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({
        oldPassword: '123456',
        password: '123456',
        confirmPassword: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should able to update', async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({
        name: 'Henrique',
      });

    expect(response.status).toBe(200);
  });
});
