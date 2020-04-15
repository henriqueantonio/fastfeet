import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ContainerComp({ children }) {
  return <Container>{children}</Container>;
}

ContainerComp.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};
