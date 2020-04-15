import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from './styles';

export default function ModalComp({
  setModalIsOpen,
  modalIsOpen,
  children,
  style,
}) {
  return (
    <Modal
      style={{ content: style }}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen({})}
    >
      {children}
    </Modal>
  );
}

ModalComp.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool,
  children: PropTypes.element.isRequired,
  style: PropTypes.objectOf(PropTypes.object),
};

ModalComp.defaultProps = {
  modalIsOpen: false,
  style: null,
};
