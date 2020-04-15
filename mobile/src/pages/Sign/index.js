import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { Container, Logo, Button, Input } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';

export default function Sign() {
  const distpach = useDispatch();
  const [id, setId] = useState();
  const loading = useSelector(state => state.auth.loading);

  function handleLogin() {
    distpach(signInRequest(id));
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#f5f5f5" />
      <Logo source={logo} />
      <Input
        keyboardType="number-pad"
        placeholder="Informe seu ID de cadastro"
        value={id}
        onChangeText={setId}
      />
      <Button loading={loading} onPress={handleLogin}>
        Entrar no sistema
      </Button>
    </Container>
  );
}
