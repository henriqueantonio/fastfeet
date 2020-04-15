import styled from 'styled-components';
import TableComp from '~/components/Table';
import ContainerComp from '~/components/Container';

export const Container = styled(ContainerComp)``;

export const Title = styled.h1`
  color: #444444;
  font-weight: bold;
  font-size: 24px;
`;

export const Table = styled(TableComp)``;

export const ModalContainer = styled.div`
  strong {
    font-size: 14px;
    color: #444444;
  }

  div {
    overflow-wrap: break-word;
    margin-top: 10px;
    font-size: 16px;
    color: #666666;
  }
`;
