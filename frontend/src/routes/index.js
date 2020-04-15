import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Sign from '~/pages/Sign';

import Deliveryman from '~/pages/Deliveryman';
import Delivery from '~/pages/Delivery';
import DeliverymanRegister from '~/pages/DeliverymanRegister';
import DeliverymanEdition from '~/pages/DeliverymanEdition';
import Recipient from '~/pages/Recipient';
import RecipientRegister from '~/pages/RecipientRegister';
import RecipientEdition from '~/pages/RecipientEdition';
import DeliveryRegister from '~/pages/DeliveryRegister';
import DeliveryEdition from '~/pages/DeliveryEdition';
import Problem from '~/pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login">
        <Sign />
      </Route>
      <Route path="/deliverymen" isPrivate>
        <Deliveryman />
      </Route>
      <Route path="/deliveryman/register" isPrivate>
        <DeliverymanRegister />
      </Route>
      <Route path="/deliveryman/edition" isPrivate>
        <DeliverymanEdition />
      </Route>
      <Route path="/recipients" isPrivate>
        <Recipient />
      </Route>
      <Route path="/recipient/register" isPrivate>
        <RecipientRegister />
      </Route>
      <Route path="/recipient/edition" isPrivate>
        <RecipientEdition />
      </Route>
      <Route path="/problems" isPrivate>
        <Problem />
      </Route>
      <Route path="/delivery/register" isPrivate>
        <DeliveryRegister />
      </Route>
      <Route path="/delivery/edition" isPrivate>
        <DeliveryEdition />
      </Route>
      <Route path="/" isPrivate>
        <Delivery />
      </Route>
    </Switch>
  );
}
