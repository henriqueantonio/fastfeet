import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';

import api from '~/services/api';

import { colors } from '~/styles';

import {
  ContainerOut,
  Container,
  BackButton,
  Input,
  InputView,
  Button,
} from './styles';

export default function Problem({ route, navigation }) {
  navigation.setOptions({
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTransparent: true,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: () => (
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" color="#fff" size={30} />
      </BackButton>
    ),
  });
  const { id } = route.params;
  const [description, setDescription] = useState();

  async function handleSubmit() {
    try {
      await api.post(`/delivery/${id}/problems`, { description });
      Alert.alert('Sucesso!', 'Seu problema foi salvo com sucesso!');
      setDescription();
    } catch (err) {
      Alert.alert('Erro!', 'Aconteceu algo de errado, tente novamente!');
    }
  }

  return (
    <ContainerOut>
      <Container>
        <InputView>
          <Input
            placeholder="Inclua aqui o problema que ocorreu na
            entrega."
            multiline
            value={description}
            onChangeText={setDescription}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
          />
        </InputView>
        <Button onPress={handleSubmit}>Enviar</Button>
      </Container>
    </ContainerOut>
  );
}

Problem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
