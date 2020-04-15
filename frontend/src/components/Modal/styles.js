import styled from 'styled-components';
import ModalLib from 'react-modal';

export const Modal = styled(ModalLib).attrs({
  style: {
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.7)',
    },
  },
})`
  background: #ffff;
  width: 450px;
  padding: 20px;
  border-radius: 4px;
`;
