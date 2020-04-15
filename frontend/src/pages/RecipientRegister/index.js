import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Input from '~/components/Input';

import InputMask from '~/components/InputMask';

import api from '~/services/api';

import { Container, Field } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  street: Yup.string().required('Rua obrigatória'),
  number: Yup.string().required('Número obrigatório'),
  complement: Yup.string(),
  state: Yup.string().required('Estado obrigatório'),
  city: Yup.string().required('Cidade obrigatória'),
  cep: Yup.string()
    .min(9, 'CEP inválido')
    .max(9, 'CEP inválido')
    .required('CEP obrigatória'),
});

export default function RecipientRegister() {
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      await api.post('/recipients', data);
      toast.success('Sucesso!');
      history.push('/recipients');
    } catch (err) {
      toast.error('Aconteceu um erro, tente novamente');
    }
  }
  return (
    <Container
      schema={schema}
      onSubmit={handleSubmit}
      title="Cadastro de destinatários"
      backPath="/recipients"
    >
      <Input name="name" placeholder="Ludwig van Beethoven" label="Nome" />
      <Field>
        <div>
          <Input name="street" placeholder="Rua Beethoven" label="Rua" />
        </div>
        <div>
          <Input name="number" placeholder="1729" label="Número" />
        </div>
        <div>
          <Input
            name="complement"
            label="Complemento"
            placeholder="Digite um complemento..."
          />
        </div>
      </Field>
      <Field>
        <div>
          <Input name="city" placeholder="Diadema" label="Cidade" />
        </div>
        <div>
          <Input name="state" placeholder="São Paulo" label="Estado" />
        </div>
        <div>
          <InputMask
            name="cep"
            label="CEP"
            placeholder="00000-000"
            mask="99999-999"
          />
        </div>
      </Field>
    </Container>
  );
}
