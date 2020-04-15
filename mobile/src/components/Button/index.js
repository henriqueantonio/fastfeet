import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container, Text } from './styles';
import { colors } from '~/styles';

export default function Button({
  children,
  loading,
  buttonColor,
  buttonText,
  ...rest
}) {
  return (
    <Container buttonColor={buttonColor} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text buttonText={buttonText}>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  buttonColor: PropTypes.string,
  buttonText: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  buttonColor: colors.primary,
  buttonText: '#ffff',
};
