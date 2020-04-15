import React from 'react';
import PropTypes from 'prop-types';

import { Container, Step, Circle, Title, Line } from './styles';

export default function Progress({ position }) {
  return (
    <Container>
      <Step>
        <Circle done={position >= 0} />
        <Title>Aguardando Retirada</Title>
      </Step>
      <Step>
        <Circle done={position >= 1} />
        <Title>Retirada</Title>
      </Step>
      <Step>
        <Circle done={position >= 2} />
        <Title>Entregue</Title>
      </Step>
      <Line />
    </Container>
  );
}

Progress.propTypes = {
  position: PropTypes.number.isRequired,
};
