import styled from 'styled-components/native';
import { colors } from '~/styles';

export const Container = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: space-around;
`;

export const Step = styled.View`
  flex: 1;
  align-items: center;
  position: relative;
  z-index: 10;
`;

export const Circle = styled.View`
  height: 15px;
  width: 15px;
  border-radius: 7.5px;
  background: ${props => (props.done ? colors.primary : '#ffff')};
  border: 2px solid ${colors.primary};
  margin-bottom: 4px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #999999;
`;

export const Line = styled.View`
  position: absolute;
  top: 13%;
  left: 15%;
  width: 70%;
  flex-direction: row;
  border-bottom-color: ${colors.primary};
  border-bottom-width: 1px;
`;
