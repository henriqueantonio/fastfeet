import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '~/components/Input';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

export default function Sign() {
  const disptach = useDispatch();
  const formRef = useRef(null);

  function handleSubmit({ email, password }) {
    disptach(signInRequest(email, password));
  }

  async function handleValidation() {
    if (schema) {
      try {
        formRef.current.setErrors({});
        await schema.validate(formRef.current.getData(), {
          abortEarly: false,
        });
        handleSubmit(formRef.current.getData());
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });

          formRef.current.setErrors(validationErrors);
        }
      }
    } else {
      handleSubmit(formRef.current.getData());
    }
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form onSubmit={handleValidation} ref={formRef}>
        <Input
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          label="SEU E-MAIL"
        />

        <Input
          name="password"
          type="password"
          placeholder="********"
          label="SUA SENHA"
        />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
