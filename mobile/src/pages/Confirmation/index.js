import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '~/styles';
import {
  ContainerOut,
  Container,
  BackButton,
  View,
  Button,
  Camera,
  PicButton,
  Photo,
} from './styles';

import api from '~/services/api';

export default function Confirmation({ route, navigation }) {
  const [photo, setPhoto] = useState(null);
  const { id } = route.params;
  const deliveryman_id = useSelector(state => state.user.profile.id);

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

  async function takePicture(camera) {
    if (camera) {
      const options = {
        quality: 0.5,
        base64: false,
        forceUpOrientation: true,
        fixOrientation: true,
      };
      const data = await camera.takePictureAsync(options);
      setPhoto(data);
    }
  }

  function anotherPicture() {
    setPhoto(null);
  }

  async function handleSubmit() {
    if (!photo) {
      return Alert.alert('Você precisa enviar uma foto da sua assinatura.');
    }
    const signature = new FormData();
    signature.append('file', {
      uri: photo.uri,
      type: 'img/jpg',
      name: new Date().toString(),
    });
    try {
      const file = await api.post('/files', signature);

      await api.put(`/deliverymen/${deliveryman_id}/deliveries/${id}`, {
        signature_id: file.data.id,
      });

      Alert.alert('Sucesso!', 'Entrega confirmada.');
      return navigation.navigate('Delivery');
    } catch (err) {
      return Alert.alert('Erro', 'Aconteceu algum erro, tente novamente.');
    }
  }

  return (
    <ContainerOut>
      <Container>
        <View>
          {photo ? (
            <>
              <Button
                onPress={anotherPicture}
                buttonText={colors.primary}
                color="#fff"
              >
                Tirar novamente
              </Button>
              <Photo
                resizeMode="contain"
                source={photo && { uri: photo.uri }}
              />
            </>
          ) : (
            <Camera
              ref={photo}
              type={Camera.Constants.Type.back}
              autoFocus={Camera.Constants.AutoFocus.on}
              flashMode={Camera.Constants.FlashMode.off}
              captureAudio={false}
            >
              {({ camera, status }) => {
                if (status !== 'READY') return <ActivityIndicator />;
                return (
                  <PicButton onPress={() => takePicture(camera)}>
                    <Icon name="camera-alt" size={25} color="#fff" />
                  </PicButton>
                );
              }}
            </Camera>
          )}
          <Button onPress={handleSubmit}>Enviar</Button>
        </View>
      </Container>
    </ContainerOut>
  );
}
