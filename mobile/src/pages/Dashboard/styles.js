import styled from 'styled-components/native';
import { colors } from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Button = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
`;

export const DeliveriesHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
  margin-top: 0;
  align-items: center;
`;

export const DeliveriesTypes = styled.View`
  flex-direction: row;
`;

export const DeliveriesTypesText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-left: 20px;
  color: ${props => (props.active ? colors.primary : '#999999')};
  text-decoration: ${props => (props.active ? colors.primary : '#fff')}
    underline;
`;
