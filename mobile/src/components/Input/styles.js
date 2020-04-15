import styled from 'styled-components/native';
import { colors } from '~/styles';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  background: rgba(244, 242, 242, 242);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  /* box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2); */
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgb(155, 151, 149)',
})`
  flex: 1;
  font-size: 15px;
  color: ${colors.gray};
`;
