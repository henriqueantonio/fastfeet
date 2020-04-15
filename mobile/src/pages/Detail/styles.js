import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { darken } from 'polished';
import { colors } from '~/styles';

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
  position: absolute;
`;

export const Card = styled.View`
  margin: 5px 20px;
  border-radius: 5px;
  height: auto;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
`;

export const Options = styled.View`
  flex-direction: row;
  margin: 5px 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
`;

export const Option = styled(RectButton)`
  flex: 1;
  background: ${props => (props.enabled ? '#f8f9fd' : darken(0.02, '#f8f9fd'))};
  height: 83px;

  align-items: center;
  justify-content: center;

  border-right-width: 1.5px;
  border-right-color: #eeee;
  padding: 20px;
`;

export const OptionText = styled.Text`
  font-size: 14px;
  color: #999999;
  text-align: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 0 10px;
  margin-top: 10px;
  align-items: center;
`;

export const HeaderText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  color: ${colors.primary};
`;

export const Content = styled.View`
  padding: 10px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: #9999;
  font-weight: bold;
  margin-bottom: 3px;
`;

export const Text = styled.Text`
  color: #666;
`;
