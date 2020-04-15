import styled from 'styled-components';
import FormComp from '~/components/Form';

export const Container = styled(FormComp)``;

export const ImgSelector = styled.button`
  align-self: center;
  justify-content: center;
  align-items: center;

  height: 150px;
  width: 150px;
  border-radius: 75px;
  background: #fff;
  border: 1px dashed #dddddd;

  input {
    display: none;
  }
`;

export const DeliverymanImg = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  background: #999999;
  object-fit: cover;
  align-self: center;
`;
