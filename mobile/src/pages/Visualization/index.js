import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { colors } from '~/styles';

import {
  ContainerOut,
  Container,
  BackButton,
  View,
  Title,
  Problems,
  Problem,
  Description,
  Date,
} from './styles';

export default function Visualization({ route, navigation }) {
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
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function handleProblems() {
      const response = await api.get(`/delivery/${id}/problems`);
      setProblems(response.data);
    }
    handleProblems();
  }, [id]);

  return (
    <ContainerOut>
      <Container>
        <View>
          <Title>Encomenda {id}</Title>
          <Problems
            data={problems}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Problem>
                <Description numberOfLines={1}>{item.description}</Description>
                <Date>{format(parseISO(item.updated_at), 'dd/MM/yyyy')}</Date>
              </Problem>
            )}
          />
        </View>
      </Container>
    </ContainerOut>
  );
}

Visualization.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
