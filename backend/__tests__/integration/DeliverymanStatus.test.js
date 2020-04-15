import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('DeliverymanStatus', () => {
  beforeEach(async () => {
    await truncate();
  });

  it("shouldn't be able to find a deliveryman if he not exists", async () => {
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
      .get(`/deliverymen/${deliveryman.body.id + 1}/deliveries`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(404);
  });

  it('should be able to find a deliverymanstatus filtered by product', async () => {
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
      .get(`/deliverymen/${deliveryman.body.id}/deliveries?q=test`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should be able to find a deliverymanstatus filtered by delivered', async () => {
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
      .get(`/deliverymen/${deliveryman.body.id}/deliveries?delivered=true`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });

  it('should be able to find a all deliverymanstatus and count', async () => {
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
      .get(`/deliverymen/${deliveryman.body.id}/deliveries`)
      .set('Authorization', `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
  });
});
