import styled from 'styled-components/native';
import IconLib from 'react-native-vector-icons/MaterialIcons';
import { colors } from '~/styles';

export const Container = styled.View`
  height: 170px;
  margin: 15px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  background: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
`;

export const Icon = styled(IconLib).attrs({
  color: colors.primary,
})``;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Content = styled.View``;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background: #f8f9fd;
  padding: 0 10px;
`;

export const Details = styled.View``;

export const Sub = styled.Text`
  color: #999;
`;

export const Text = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${props => (props.details ? colors.primary : '#444')};
`;

export const Button = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
})``;
