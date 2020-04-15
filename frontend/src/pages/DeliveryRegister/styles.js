import styled from 'styled-components';
import FormComp from '~/components/Form';

export const Container = styled(FormComp)``;

export const Field = styled.div`
  @media (max-width: 843px) {
    flex-direction: column;
  }

  display: flex;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 15px;
`;
