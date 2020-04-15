import React from 'react';
import PropTypes from 'prop-types';

import { MdChevronLeft, MdDone } from 'react-icons/md';

import { Header, Buttons, Button, SaveButton } from './styles';

export default function FormHeader({ title, backPath }) {
  return (
    <Header>
      <h1>{title}</h1>
      <Buttons>
        <Button
          color="#CCCCCC"
          icon={<MdChevronLeft size={20} color="#fff" />}
          to={backPath}
        >
          Voltar
        </Button>
        <SaveButton icon={<MdDone size={20} color="#fff" />}>Salvar</SaveButton>
      </Buttons>
    </Header>
  );
}

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
};
