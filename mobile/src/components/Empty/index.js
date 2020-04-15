import React from 'react';

import EmptyImage from '~/assets/empty.png';

import { Container, Text, ContText, Image } from './styles';

export default function Empty() {
  return (
    <Container>
      <Image
        source={EmptyImage}
        alt="Sem conteúdo"
        style={{ resizeMode: 'contain' }}
      />
      <Text>Nada encontrado</Text>
      <ContText>Vasculhei por todas as entregas e não encontrei nada!</ContText>
    </Container>
  );
}
