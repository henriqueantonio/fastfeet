import styled from 'styled-components';
import TableComp from '~/components/Table';
import OptionsComp from '~/components/Options';
import ContainerComp from '~/components/Container';

export const Container = styled(ContainerComp)``;

export const Table = styled(TableComp)``;

export const Deliveryman = styled.div`
  display: flex;
  align-items: center;

  img {
    display: flex;
    margin-right: 5px;
    height: 35px;
    width: 35px;
    border-radius: 17.5px;
    background: #f4effc;

    text-transform: uppercase;
    font-size: 16px;
    color: #a28fd0;
    justify-content: center;
    align-items: center;
    object-fit: cover;
  }

  div {
    display: flex;
    margin-right: 5px;
    height: 35px;
    width: 35px;
    border-radius: 17.5px;
    background: #f4effc;

    text-transform: uppercase;
    font-size: 16px;
    color: #a28fd0;
    justify-content: center;
    align-items: center;
  }
`;

export const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 25px;
  max-width: 130px;

  div {
    background: ${props =>
      (props.status === 0 && '#c1bc35') ||
      (props.status === 1 && '#2CA42B') ||
      '#DE3B3B'};
    height: 10px;
    width: 10px;
    border-radius: 5px;
    margin-right: 10px;
  }

  border-radius: 12px;
  background: ${props =>
    (props.status === 0 && '#F0F0DF') ||
    (props.status === 1 && '#DFF0DF') ||
    '#FAB0B0'};

  color: ${props =>
    (props.status === 0 && '#c1bc35') ||
    (props.status === 1 && '#2CA42B') ||
    '#DE3B3B'};
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
`;

export const Options = styled(OptionsComp)``;
