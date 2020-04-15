import React from 'react';
import PropTypes from 'prop-types';

import { MdAdd } from 'react-icons/md';

import { Container, Header, Button, SearchButton } from './styles';

export default function ManageHeader({ setSearch, title, registerPath }) {
  return (
    <Container>
      <h1>Gerenciando {title}</h1>
      <Header>
        <SearchButton
          placeholder="Buscar por encomendas"
          setSearch={setSearch}
        />
        <Button to={registerPath} icon={<MdAdd size={20} color="#fff" />}>
          Cadastrar
        </Button>
      </Header>
    </Container>
  );
}

ManageHeader.propTypes = {
  setSearch: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  registerPath: PropTypes.string.isRequired,
};
