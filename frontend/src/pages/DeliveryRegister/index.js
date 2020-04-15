import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import Input from '~/components/Input';
import Select from '~/components/Select';

import api from '~/services/api';

import { Container, Div, Field } from './styles';

const schema = Yup.object().shape({
  productName: Yup.string().required('Nome do produto obrigatório'),
  recipient: Yup.string('Selecione um destinatário').required(
    'Destinatário obrigatório'
  ),
  deliveryman: Yup.string('Selecione um entregador').required(
    'Entregador obrigatório'
  ),
});

export default function DeliveryRegister() {
  const history = useHistory();

  async function handleSubmit({ recipient, deliveryman, productName }) {
    try {
      await api.post('/deliveries', {
        recipient_id: recipient,
        deliveryman_id: deliveryman,
        product: productName,
      });
      toast.success('Sucesso!');
      history.push('/');
    } catch (err) {
      toast.error('Algo de errado aconteceu no cadastro, tente novamente');
    }
  }

  return (
    <Container
      title="Cadastro de encomendas"
      backPath="/"
      schema={schema}
      onSubmit={handleSubmit}
    >
      <Field>
        <Div>
          <Select
            label="Destinatário"
            name="recipient"
            path="/recipients"
            placeholder="Selecione o destinatário"
          />
        </Div>
        <Div>
          <Select label="Entregador" name="deliveryman" path="/deliverymen" />
        </Div>
      </Field>
      <Field>
        <Div>
          <Input
            name="productName"
            label="Nome do produto"
            placeholder="Yamaha SX7"
          />
        </Div>
      </Field>
    </Container>
  );
}
