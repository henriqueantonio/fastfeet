import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import ReactInputMask from 'react-input-mask';

export default function InputMask({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>

      <ReactInputMask
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
