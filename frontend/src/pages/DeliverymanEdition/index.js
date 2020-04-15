import React, { useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import Input from '~/components/Input';
import api from '~/services/api';

import { Container, ImgSelector, DeliverymanImg } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail obrigatório'),
});

export default function DeliverymanEdition() {
  const inputRef = useRef();
  const {
    state: { id, name: nameInput, email: emailInput, avatar },
  } = useLocation();
  const history = useHistory();
  const [photo, setPhoto] = useState();

  async function handleSubmit(data) {
    try {
      if (photo) {
        const formData = new FormData();
        formData.append('file', photo);
        const file = await api.post('/files', formData);
        data = { ...data, avatar_id: file.data.id };
      }
      await api.put(`deliverymen/${id}`, data);
      toast.success('Sucesso!');
      history.push('/deliverymen');
    } catch (err) {
      toast.error('Aconteceu um erro, tente novamente');
    }
  }

  function handlePhoto() {
    return inputRef.current.click();
  }

  function handleFile(e) {
    e.preventDefault();
    setPhoto(e.target.files[0]);
  }

  return (
    <Container
      schema={schema}
      onSubmit={handleSubmit}
      initialData={{ name: nameInput, email: emailInput }}
      title="Edição de entregadores"
      backPath="/deliverymen"
    >
      <ImgSelector type="button" onClick={() => handlePhoto()}>
        <input
          type="file"
          ref={inputRef}
          accept="image/png, image/jpeg"
          onChange={handleFile}
        />
        <DeliverymanImg
          src={(photo && URL.createObjectURL(photo)) || avatar.url}
          alt="avatar"
        />
      </ImgSelector>
      <Input name="name" placeholder="John Doe" label="Nome" />
      <Input name="email" placeholder="exemplo@rocketseat.com" label="E-mail" />
    </Container>
  );
}
