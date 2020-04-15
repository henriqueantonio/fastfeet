import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
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

export const View = styled.View`
  top: -80px;
  right: 0;
  left: 0;
  bottom: 0;
  position: absolute;
`;

export const Button = styled(ButtonComp)`
  margin: 20px;
  background: ${props => (props.color ? props.color : colors.primary)};
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const Camera = styled(RNCamera)`
  height: 80%;
  margin: 10px;
  align-items: center;
  justify-content: flex-end;
`;

export const PicButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background: rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;

export const Photo = styled.Image`
  flex: 1;
  margin: 0 10px;
`;
