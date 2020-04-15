import styled from 'styled-components';
import ButtonComp from '~/components/Button';

export const Container = styled.div``;

export const Header = styled.div`
  @media (max-width: 995px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`;

export const Buttons = styled.div`
  display: flex;

  a:first-child {
    margin-right: 10px;
  }
`;

export const Button = styled(ButtonComp)``;

export const SaveButton = styled(ButtonComp).attrs({
  button: true,
})``;
