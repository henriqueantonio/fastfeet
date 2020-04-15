import React from 'react';
import PropTypes from 'prop-types';

import { ContainerLink, ContainerButton, Icon } from './styles';

export default function Button({
  color,
  icon,
  children,
  to,
  button,
  onClick,
  style,
}) {
  return (
    <>
      {button ? (
        <ContainerButton
          style={style}
          type="submit"
          onClick={() => onClick()}
          color={color}
        >
          <Icon>{icon}</Icon>
          <div>{children}</div>
        </ContainerButton>
      ) : (
        <ContainerLink to={to} color={color} style={style}>
          <Icon>{icon}</Icon>
          <div>{children}</div>
        </ContainerLink>
      )}
    </>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.string,
  button: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.object),
};

Button.defaultProps = {
  to: '/',
  color: null,
  icon: null,
  children: null,
  button: false,
  onClick: () => {},
  style: null,
};
