import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import PendingDeliveries from '~/components/PendingDeliveries';
import DeliveredDeliveries from '~/components/DeliveredDeliveries';

import {
  Container,
  Button,
  Title,
  DeliveriesHeader,
  DeliveriesTypes,
  DeliveriesTypesText,
} from './styles';

export default function Dashboard({ navigation, isFocused }) {
  const profile = useSelector(state => state.user.profile);
  const [pending, setPending] = useState(true);
  const [delivered, setDelivered] = useState(false);

  function handleListChange(status) {
    if (status === 'pending' && pending) {
      return;
    }
    if (status === 'delivered' && delivered) {
      return;
    }
    setPending(!pending);
    setDelivered(!delivered);
  }

  return (
    <Container>
      <Header profile={profile} navigation={navigation} />
      <DeliveriesHeader>
        <Title>Entregas</Title>
        <DeliveriesTypes>
          <Button onPress={() => handleListChange('pending')}>
            <DeliveriesTypesText active={pending}>
              Pendentes
            </DeliveriesTypesText>
          </Button>
          <Button onPress={() => handleListChange('delivered')}>
            <DeliveriesTypesText active={delivered}>
              Entregues
            </DeliveriesTypesText>
          </Button>
        </DeliveriesTypes>
      </DeliveriesHeader>

      {pending ? (
        <PendingDeliveries
          isFocused={isFocused}
          navigation={navigation}
          profile={profile.id}
        />
      ) : (
        <DeliveredDeliveries
          isFocused={isFocused}
          navigation={navigation}
          profile={profile.id}
        />
      )}
    </Container>
  );
}
