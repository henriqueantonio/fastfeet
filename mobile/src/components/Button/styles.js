import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { colors } from '~/styles';

export const Container = styled(RectButton)`
  height: 46px;
  background: ${props =>
    props.buttonColor ? props.buttonColor : colors.primary};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  align-self: stretch;
`;

export const Text = styled.Text`
  color: ${props => (props.buttonText ? props.buttonText : '#fff')};
  font-weight: bold;
  font-size: 16px;
`;
