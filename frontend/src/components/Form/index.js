import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import FormHeader from '~/components/FormHeader';

import { Container, FormView } from './styles';

export default function FormComp({
  children,
  title,
  backPath,
  schema,
  onSubmit,
  initialData,
}) {
  const formRef = useRef(null);

  async function handleValidation() {
    if (schema) {
      try {
        formRef.current.setErrors({});
        await schema.validate(formRef.current.getData(), {
          abortEarly: false,
        });
        onSubmit(formRef.current.getData());
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
      onSubmit(formRef.current.getData());
    }
  }

  return (
    <Container>
      <Form onSubmit={handleValidation} initialData={initialData} ref={formRef}>
        <FormHeader title={title} backPath={backPath} />
        <FormView>{children}</FormView>
      </Form>
    </Container>
  );
}

FormComp.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  backPath: PropTypes.string.isRequired,
  schema: PropTypes.objectOf,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.objectOf,
};

FormComp.defaultProps = {
  schema: null,
  initialData: {},
};
