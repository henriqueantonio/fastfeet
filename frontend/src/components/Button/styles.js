import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';
import colors from '~/styles/colors';

export const ContainerLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.color ? props.color : colors.primary)};
  height: 36px;
  width: 142px;
  padding: 8px;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${props =>
      props.color ? darken(0.03, props.color) : darken(0.03, colors.primary)};
  }

  div {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const ContainerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.color ? props.color : colors.primary)};
  height: 36px;
  width: 142px;
  padding: 8px;
  border: 0;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: ${props =>
      props.color ? darken(0.03, props.color) : darken(0.03, colors.primary)};
  }

  div {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const Icon = styled.div`
  margin-right: 4px;
`;
