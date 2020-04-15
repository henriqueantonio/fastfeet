import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { MdInsertPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Input from '~/components/Input';

import api from '~/services/api';

import { Container, ImgSelector, DeliverymanImg } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail obrigatório'),
});

export default function DeliverymanRegister() {
  const inputRef = useRef(null);
  const [photo, setPhoto] = useState();
  const history = useHistory();

  async function handleSubmit({ name, email }) {
    if (photo) {
      try {
        const formData = new FormData();
        formData.append('file', photo);
        const file = await api.post('/files', formData);
        const avatar_id = file.data.id;
        await api.post('/deliverymen', { name, email, avatar_id });
        toast.success('Sucesso!');
        history.push('/deliverymen');
      } catch (err) {
        toast.error('Aconteceu algo de errado, tente novamente');
      }
    } else {
      toast.error('Foto necessária');
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
      title="Cadastro de entregadores"
      backPath="/deliverymen"
    >
      <ImgSelector type="button" onClick={() => handlePhoto()}>
        <input
          type="file"
          ref={inputRef}
          accept="image/png, image/jpeg"
          onChange={handleFile}
        />
        {photo ? (
          <DeliverymanImg src={URL.createObjectURL(photo)} alt="avatar" />
        ) : (
          <>
            <MdInsertPhoto size={30} color="#DDDDDD" />
            <p>Adicionar Foto</p>
          </>
        )}
      </ImgSelector>

      <Input name="name" placeholder="John Doe" label="Nome" />

      <Input name="email" placeholder="exemplo@rocketseat.com" label="E-mail" />
    </Container>
  );
}
