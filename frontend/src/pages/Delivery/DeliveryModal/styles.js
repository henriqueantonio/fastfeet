import styled from 'styled-components';
import ModalComp from '~/components/Modal';

export const Modal = styled(ModalComp)``;

export const ModalContainer = styled.div`
  strong {
    font-size: 14px;
    color: #444444;
  }

  p {
    margin-top: 5px;
    font-size: 16px;
    color: #666666;

    strong {
      font-size: 16px;
      color: #666666;
    }
  }

  hr {
    border: 1px solid #eeeeee;
    margin: 10px 0;
  }

  img {
    width: 400px;
    height: 400px;
    max-height: 200px;
    min-width: 100%;
  }
`;
