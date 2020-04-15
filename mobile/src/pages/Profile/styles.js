import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { colors } from '~/styles';
import ButtonComp from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #ffffff;
`;

export const UserIcon = styled.View`
  height: 136px;
  width: 136px;
  border-radius: 68px;
  background: #f4effc;
  margin-bottom: 60px;
  justify-content: center;
  align-items: center;
`;

export const UserImage = styled.Image`
  height: 136px;
  width: 136px;
  border-radius: 68px;
`;

export const UserIconText = styled.Text`
  color: #a28fd0;
  font-size: 60px;
`;

export const Title = styled.Text`
  margin-left: 20px;
  color: #666;
  font-size: 14px;
`;

export const Form = styled.View`
  align-self: flex-start;
`;

export const Button = styled(ButtonComp)`
  margin: 20px;
  margin-top: 50px;
  background: ${colors.red};
`;

export const Text = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 22px;
  margin: 10px 20px;
`;
