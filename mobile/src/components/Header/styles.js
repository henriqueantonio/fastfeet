import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Button = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
`;

export const Profile = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const UserIcon = styled.TouchableOpacity`
  height: 68px;
  width: 68px;
  border-radius: 34px;
  background: #f4effc;

  align-items: center;
  justify-content: center;
`;

export const UserImage = styled.Image`
  height: 68px;
  width: 68px;
  border-radius: 34px;
`;

export const UserIconText = styled.Text`
  font-size: 31px;
  color: #a28fd0;
`;

export const ProfileTitle = styled.View`
  margin-left: 10px;
`;

export const HeaderTitle = styled.Text`
  font-size: 12px;
  color: #666666;
`;
