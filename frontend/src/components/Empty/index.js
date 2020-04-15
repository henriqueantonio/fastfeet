import React from 'react';

import EmptyImage from '~/assets/empty.svg';

import { Container } from './styles';

export default function Empty() {
  return (
    <Container>
      <img src={EmptyImage} alt="Sem conteúdo" />
      <h1>Nada encontrado</h1>
      Vasculhei por todas as entregas e não encontrei nada!
    </Container>
  );
}
