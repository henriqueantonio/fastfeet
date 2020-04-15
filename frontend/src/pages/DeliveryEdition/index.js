import React from 'react';
import { toast } from 'react-toastify';
import { useLocation, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Input from '~/components/Input';
import Select from '~/components/Select';

import api from '~/services/api';

import { Container, Field, Div } from './styles';

const schema = Yup.object().shape({
  productName: Yup.string().required('Nome do produto obrigatório'),
  recipient: Yup.number('Selecione um destinatário').required(
    'Destinatário obrigatório'
  ),
  deliveryman: Yup.number('Selecione um entregador').required(
    'Entregador obrigatório'
  ),
});

export default function DeliveryEdition() {
  const {
    state: {
      id,
      product,
      recipient_id: recipientId,
      deliveryman_id: deliverymanId,
      recipient: { name: recipientName },
      deliveryman: { name: deliverymanName },
    },
  } = useLocation();
  const history = useHistory();
  async function handleSubmit({ productName, deliveryman, recipient }) {
    try {
      await api.put(`/deliveries/${id}`, {
        product: productName,
        deliveryman_id: deliveryman,
        recipient_id: recipient,
      });
      toast.success('Sucesso!');
      history.push('/');
    } catch (err) {
      toast.error('Não foi possível salvar, tente novamente');
    }
  }

  return (
    <>
      <Container
        title="Edição de encomendas"
        backPath="/"
        schema={schema}
        onSubmit={handleSubmit}
        initialData={{
          recipient: { value: recipientId, label: recipientName },
          deliveryman: { value: deliverymanId, label: deliverymanName },
          productName: product,
        }}
      >
        <Field>
          <Div>
            <Select label="Destinatário" name="recipient" path="/recipients" />
          </Div>
          <Div>
            <Select label="Entregador" name="deliveryman" path="/deliverymen" />
          </Div>
        </Field>
        <Field>
          <Div>
            <Input
              name="productName"
              placeholder="Yamaha SX7"
              label="Nome do Produto"
            />
          </Div>
        </Field>
      </Container>
    </>
  );
}
