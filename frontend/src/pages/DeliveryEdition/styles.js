import styled from 'styled-components';
import Form from '~/components/Form';

export const Container = styled(Form)``;

export const Field = styled.div`
  @media (max-width: 843px) {
    flex-direction: column;
  }

  display: flex;

  div:last-child {
    margin: 0;
  }
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 15px;
`;
