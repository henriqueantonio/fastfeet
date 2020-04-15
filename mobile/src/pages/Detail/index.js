import React from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';

import { colors } from '~/styles';

import {
  ContainerOut,
  Container,
  BackButton,
  View,
  Card,
  Options,
  Option,
  OptionText,
  Header,
  HeaderText,
  Content,
  ContentRow,
  Title,
  Text,
} from './styles';

export default function Detail({ route, navigation }) {
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
  const { item } = route.params;

  return (
    <ContainerOut>
      <StatusBar barStyle="light-content" backgroundColor="#f5f5f5" />
      <Container>
        <View>
          <Card>
            <Header>
              <IconM name="local-shipping" size={25} color={colors.primary} />
              <HeaderText>Informações da Entrega</HeaderText>
            </Header>
            <Content>
              <Title>DESTINATÁRIO</Title>
              <Text>{item.recipient.name}</Text>
            </Content>
            <Content>
              <Title>ENDEREÇO DE ENTREGA</Title>
              <Text>
                {item.recipient.street}, {item.recipient.number},{' '}
                {item.recipient.city} - {item.recipient.state},{' '}
                {item.recipient.cep}
              </Text>
            </Content>
            <Content>
              <Title>PRODUTO</Title>
              <Text>{item.product}</Text>
            </Content>
          </Card>
          <Card>
            <Header>
              <IconM name="today" size={25} color={colors.primary} />
              <HeaderText>Situação da Entrega</HeaderText>
            </Header>
            <Content>
              <Title>STATUS</Title>
              <Text>
                {(item.end_date && 'Entregue') ||
                  (item.canceled_at && 'Cancelada') ||
                  'Pendente'}
              </Text>
            </Content>
            <ContentRow>
              <Content>
                <Title>DATA DE RETIRADA</Title>
                <Text>
                  {(item.start_date &&
                    format(parseISO(item.start_date), 'dd / MM / yyyy')) ||
                    '- - / - - / - -'}
                </Text>
              </Content>
              <Content>
                <Title>DATA DE ENTREGA</Title>
                <Text>
                  {(item.end_date &&
                    format(parseISO(item.end_date), 'dd / MM / yyyy')) ||
                    '- - / - - / - -'}
                </Text>
              </Content>
            </ContentRow>
          </Card>
          <Options>
            <Option
              enabled={!item.end_date}
              onPress={() => navigation.navigate('Problem', { id: item.id })}
            >
              <Icon name="close-circle-outline" size={30} color={colors.red} />
              <OptionText>Informar Problema</OptionText>
            </Option>
            <Option
              enabled
              onPress={() =>
                navigation.navigate('Visualization', { id: item.id })
              }
            >
              <Icon name="alert-circle-outline" size={30} color="#E7BA40" />
              <OptionText>Visualizar Problemas</OptionText>
            </Option>
            <Option
              enabled={!item.end_date}
              onPress={() =>
                navigation.navigate('Confirmation', { id: item.id })
              }
            >
              <Icon
                name="check-circle-outline"
                size={30}
                color={colors.primary}
              />
              <OptionText>Confirmar Entrega</OptionText>
            </Option>
          </Options>
        </View>
      </Container>
    </ContainerOut>
  );
}

Detail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        recipient: PropTypes.shape({
          name: PropTypes.string.isRequired,
          street: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
          cep: PropTypes.string.isRequired,
        }).isRequired,
        product: PropTypes.string.isRequired,
        end_date: PropTypes.string,
        start_date: PropTypes.string,
        canceled_at: PropTypes.string,
        id: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
