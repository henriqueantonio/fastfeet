import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

import {
  Container,
  Header,
  Icon,
  Title,
  Footer,
  Details,
  Sub,
  Text,
  Button,
} from './styles';

import Progress from '~/components/Progress';

export default function Delivery({ navigation, item }) {
  return (
    <Container>
      <Header>
        <Icon name="local-shipping" size={30} />
        <Title>Encomenda {item.id}</Title>
      </Header>
      {(item.end_date && <Progress position={2} />) ||
        (item.start_date && <Progress position={1} />) || (
          <Progress position={0} />
        )}
      <Footer>
        <Details>
          <Sub>Data</Sub>
          <Text>{format(parseISO(item.createdAt), 'dd/MM/yyyy')}</Text>
        </Details>
        <Details>
          <Sub>Cidade</Sub>
          <Text>{item.recipient.city}</Text>
        </Details>
        <Button>
          <Text
            details
            onPress={() => navigation.navigate('Details', { item })}
          >
            Ver detalhes
          </Text>
        </Button>
      </Footer>
    </Container>
  );
}

Delivery.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }).isRequired,
  }),
};

Delivery.defaultProps = {
  item: {},
};
