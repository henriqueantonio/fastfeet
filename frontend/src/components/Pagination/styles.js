import styled from 'styled-components';
import { lighten, darken } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 50px;
  width: 100%;
  overflow: hidden;
`;

export const Page = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  height: 40px;
  width: 40px;
  min-width: 40px;
  min-height: 40px;
  margin: 0 8px;

  border-radius: 4px;
  background: ${props =>
    props.active ? colors.primary : lighten(0.2, colors.primary)};

  :hover {
    background: ${darken(0.1, lighten(0.2, colors.primary))};
  }

  transition: background 0.2s;

  strong {
    color: #fff;
    font-size: 18px;
  }
`;
