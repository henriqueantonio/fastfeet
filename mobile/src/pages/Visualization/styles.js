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

export const View = styled.View`
  position: absolute;
  top: -100px;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const Button = styled(ButtonComp)``;

export const BackButton = styled.TouchableOpacity`
  margin-left: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  align-self: center;
`;

export const Problems = styled.FlatList`
  flex: 1;
  margin-top: 20px;
`;

export const Problem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  margin: 10px;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 20px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #999;
  max-width: 75%;
`;

export const Date = styled.Text`
  font-size: 14px;
  color: #c1c1c1;
`;
