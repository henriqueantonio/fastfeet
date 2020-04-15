import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { colors } from '~/styles';
import ButtonComp from '~/components/Button';
import InputComp from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: ${colors.primary};

  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image``;

export const Input = styled(InputComp)`
  margin: 25px;
  margin-bottom: 5px;
`;

export const Button = styled(ButtonComp)`
  background: ${colors.secondary};
  margin: 25px;
  margin-top: 10px;
`;
