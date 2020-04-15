import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '~/styles';

import { signOut } from '~/store/modules/auth/actions';

import {
  Header,
  HeaderTitle,
  Profile,
  Title,
  UserIcon,
  UserImage,
  UserIconText,
  ProfileTitle,
  Button,
} from './styles';

export default function HeaderComp({ navigation, profile }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Header>
      <Profile>
        <UserIcon onPress={() => navigation.navigate('Profile')}>
          {profile.avatar.id ? (
            <UserImage source={{ uri: profile.avatar.url }} />
          ) : (
            <UserIconText>
              {profile.name.split(' ')[0][0] + profile.name.split(' ')[1][0]}
            </UserIconText>
          )}
        </UserIcon>
        <ProfileTitle>
          <HeaderTitle>Bem vindo de volta,</HeaderTitle>
          <Title>{profile.name}</Title>
        </ProfileTitle>
      </Profile>
      <Button onPress={handleLogout}>
        <Icon name="input" size={25} color={colors.red} />
      </Button>
    </Header>
  );
}

HeaderComp.propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    }),
    name: PropTypes.string,
  }).isRequired,
};
