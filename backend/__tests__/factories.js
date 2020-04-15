import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Recipient from '../src/app/models/Recipient';
import Deliveryman from '../src/app/models/Deliveryman';

factory.define('User', User, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
}));

factory.define('Recipient', Recipient, () => ({
  name: faker.name.findName(),
  street: faker.address.streetName(),
  number: faker.address.streetAddress().split('')[0],
  state: faker.address.state(),
  city: faker.address.city,
  cep: '00000000',
}));

factory.define('Deliveryman', Deliveryman, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
}));
export default factory;
