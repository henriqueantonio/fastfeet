import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { InputButton } from './styles';

export default function SearchButton({ setSearch, placeholder, style }) {
  return (
    <InputButton style={style}>
      <MdSearch size={20} color="#999999" />
      <input
        onChange={i => setSearch(i.target.value)}
        placeholder={placeholder}
        color="#999999"
      />
    </InputButton>
  );
}

SearchButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  setSearch: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.object),
};

SearchButton.defaultProps = {
  placeholder: 'Pesquise...',
  style: null,
};
