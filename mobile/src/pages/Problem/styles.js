import styled from 'styled-components/native';
import { colors } from '~/styles';
import ButtonComp from '~/components/Button';

export const ContainerOut = styled.SafeAreaView`
  flex: 1;
  background: ${colors.primary};
`;

export const Container = styled.View`
  flex: 1;
  background: #fff;
  margin-top: 155px;
`;

export const InputView = styled.View`
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  margin: 20px;
  border-radius: 5px;
  height: 300px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  padding: 10px;
  font-size: 16px;
  color: #444;
`;

export const Button = styled(ButtonComp)`
  top: 230px;
  margin: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 20px;
`;
