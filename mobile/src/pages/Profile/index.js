import React from 'react';
import { parseISO, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  UserIcon,
  UserImage,
  UserIconText,
  Form,
  Title,
  Button,
  Text,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <UserIcon>
        {profile.avatar.id ? (
          <UserImage source={{ uri: profile.avatar.url }} />
        ) : (
          <UserIconText>
            {profile.name.split(' ')[0][0] + profile.name.split(' ')[1][0]}
          </UserIconText>
        )}
      </UserIcon>
      <Form>
        <Title>Nome completo</Title>
        <Text>{profile.name}</Text>
      </Form>
      <Form>
        <Title>E-mail</Title>
        <Text>{profile.email}</Text>
      </Form>
      <Form>
        <Title>Data de cadastro</Title>
        <Text>{format(parseISO(profile.createdAt), 'dd/MM/yyyy')}</Text>
      </Form>
      <Button onPress={handleLogout}>Logout</Button>
    </Container>
  );
}
