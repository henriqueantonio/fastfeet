import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Modal, ModalContainer } from './styles';

export default function DeliveryModal({ visu, setVisu }) {
  return (
    <Modal
      modalIsOpen={(Object.keys(visu).length && true) || false}
      setModalIsOpen={setVisu}
    >
      <ModalContainer>
        <strong>Informações da encomenda</strong>
        <p>
          {(visu && visu.recipient && visu.recipient.street) ||
            'Rua indefinida'}
          ,{' '}
          {(visu && visu.recipient && visu.recipient.number) ||
            'Número indefinido'}
        </p>
        <p>
          {(visu && visu.recipient && visu.recipient.city) ||
            'Cidade indefinida'}
          -
          {(visu && visu.recipient && visu.recipient.state) ||
            'Estado indefinido'}
        </p>
        <p>
          {(visu && visu.recipient && visu.recipient.cep) || 'CEP indefinido'}
        </p>
        <hr />
        <strong>Datas</strong>
        <p>
          <strong>Retirada:</strong>{' '}
          {(visu &&
            visu.start_date &&
            format(new Date(visu.start_date), 'dd/MM/yyyy')) ||
            'Data indefinida'}
        </p>
        <p>
          <strong>Entrega:</strong>{' '}
          {(visu &&
            visu.start_date &&
            format(new Date(visu.end_date), 'dd/MM/yyyy')) ||
            'Data indefinida'}
        </p>
        <hr />
        <strong>Assinatura do destinatário</strong>
        <p>
          {(visu && visu.signature && visu.signature.url && (
            <img src={visu.signature.url} alt="assinatura" />
          )) ||
            'Assinatura indefinida'}
        </p>
      </ModalContainer>
    </Modal>
  );
}

DeliveryModal.propTypes = {
  visu: PropTypes.objectOf(PropTypes.object).isRequired,
  setVisu: PropTypes.elementType.isRequired,
};
