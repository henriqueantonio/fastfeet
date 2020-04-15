import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@unform/core';

import api from '~/services/api';

import { Select } from './styles';

export default function SelectInput({ name, label, path, ...rest }) {
  const inputRef = useRef(null);
  const [options, setOptions] = useState();

  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map(option => option.value);
        }
        if (
          !(ref && ref.select && ref.select.state && ref.select.state.value)
        ) {
          return undefined;
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  function filter(inputValue) {
    return options.filter(e =>
      e.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  const loadOptions = inputValue =>
    new Promise(resolve => {
      resolve(filter(inputValue));
    });

  useEffect(() => {
    async function loadData() {
      const response = await api.get(path);

      const result = response.data.rows.map(i => ({
        value: i.id,
        label: i.name,
      }));

      setOptions(result);
    }

    loadData();
  }, [path]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <Select
        cacheOptions
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        noOptionsMessage={() => 'Sem opções'}
        placeholder="Selecione..."
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
