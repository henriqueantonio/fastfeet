import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Recipient', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to find all recipients filtered by name', async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .get('/recipients?q=name')
      .set('Authorization', `Bearer ${token.body.token}`);
    expect(response.status).toBe(200);
  });

  it('should be able to find all recipients', async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .get('/recipients')
      .set('Authorization', `Bearer ${token.body.token}`);
    expect(response.status).toBe(200);
  });

  it('should be able to create a recipient', async () => {
    const userFac = await factory.attrs('User');
    const recipientFac = await factory.attrs('Recipient');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(recipientFac);

    expect(response.status).toBe(200);
  });

  it('should be able to update a recipient', async () => {
    const userFac = await factory.attrs('User');
    const recipientFac = await factory.attrs('Recipient');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const recipient = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(recipientFac);

    const response = await request(app)
      .put(`/recipients/${recipient.body.id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({
        name: 'teste',
      });

    expect(response.status).toBe(200);
  });

  it('should be able to delete a recipient', async () => {
    const userFac = await factory.attrs('User');
    const recipientFac = await factory.attrs('Recipient');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const recipient = await request(app)
      .post('/recipients')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send(recipientFac);

    const response = await request(app)
      .delete(`/recipients/${recipient.body.id}`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });
});
