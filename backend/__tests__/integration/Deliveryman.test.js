import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('Deliveryman', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to find one deliveryman by name', async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .get('/deliverymen?q=teste')
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });

  it("shouldn't be able to find one deliveryman by id if there are no deliveryman id in database", async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .get('/deliverymen?id=1')
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(404);
  });

  it('should be able to find one deliveryman by id', async () => {
    const userFac = await factory.attrs('User');
    const deliverymanFac = await factory.attrs('Deliveryman');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const file = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac, avatar_id: file.body.id });

    const response = await request(app)
      .get(`/deliverymen?id=${deliveryman.body.id}`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should be able to find one deliveryman', async () => {
    const userFac = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const response = await request(app)
      .get('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });

  it("shouldn't be able to create a recipient if the email already exists", async () => {
    const userFac = await factory.attrs('User');
    const deliverymanFac = await factory.attrs('Deliveryman');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const file = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac, avatar_id: file.body.id });

    const response = await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac, avatar_id: 1 });

    expect(response.status).toBe(401);
  });

  it("shouldn't be able to update a deliveryman if he not exists", async () => {
    const userFac = await factory.attrs('User');
    const deliverymanFac = await factory.attrs('Deliveryman');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const file = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac, avatar_id: file.body.id });

    const response = await request(app)
      .put(`/deliverymen/${deliveryman.body.id + 1}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ name: 'teste' });

    expect(response.status).toBe(404);
  });

  it("shouldn't be able to update the email if it already exists", async () => {
    const userFac = await factory.attrs('User');
    const deliverymanFac = await factory.attrsMany('Deliveryman', 2);

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const file = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac[0], avatar_id: file.body.id });

    await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac[1], avatar_id: file.body.id });

    const response = await request(app)
      .put(`/deliverymen/${deliveryman.body.id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ email: deliverymanFac[1].email });

    expect(response.status).toBe(401);
  });

  it('should be able to update', async () => {
    const userFac = await factory.attrs('User');
    const deliverymanFac = await factory.attrs('Deliveryman');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const file = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac, avatar_id: file.body.id });

    const response = await request(app)
      .put(`/deliverymen/${deliveryman.body.id}`)
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ email: 'test@test.com' });

    expect(response.status).toBe(200);
  });

  it('should be able to delete', async () => {
    const userFac = await factory.attrs('User');
    const deliverymanFac = await factory.attrs('Deliveryman');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const file = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac, avatar_id: file.body.id });

    const response = await request(app)
      .delete(`/deliverymen/${deliveryman.body.id}`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });

  it("shouldn't be able to delete a deliveryman if he not exists", async () => {
    const userFac = await factory.attrs('User');
    const deliverymanFac = await factory.attrs('Deliveryman');

    await request(app)
      .post('/users')
      .send(userFac);

    // session
    const token = await request(app)
      .post('/sessions')
      .send({ email: userFac.email, password: userFac.password });

    const file = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token.body.token}`)
      .attach('file', '__tests__/util/test_file.txt');

    const deliveryman = await request(app)
      .post('/deliverymen')
      .set('Authorization', `Bearer ${token.body.token}`)
      .send({ ...deliverymanFac, avatar_id: file.body.id });

    const response = await request(app)
      .delete(`/deliverymen/${deliveryman.body.id + 1}`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(404);
  });
});
