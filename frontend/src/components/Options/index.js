import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdMoreHoriz,
  MdDeleteForever,
  MdCreate,
  MdVisibility,
} from 'react-icons/md';

import api from '~/services/api';

import { Options, TransparentButton } from './styles';

export default function OptionsComp({
  setVisu,
  visu,
  edit,
  editPath,
  excludeName,
  excludePath,
}) {
  const history = useHistory();

  async function handleExclude() {
    if (excludePath) {
      try {
        // eslint-disable-next-line no-alert
        const confirmation = window.confirm('Você realmente deseja excluir?');
        if (confirmation) {
          await api.delete(excludePath);
          toast.success('Sucesso!');
          history.push('/');
        }
      } catch (err) {
        toast.error('Erro ao excluir, tente novamente!');
      }
    }
  }
  const [enabled, setEnabled] = useState(false);

  function handleVisualization() {
    setEnabled(!enabled);
    setVisu(visu);
  }

  function handleBlur() {
    setEnabled(!enabled);
  }

  return (
    <Options enabled={enabled} onBlur={handleBlur}>
      <TransparentButton onClick={() => setEnabled(!enabled)} type="button">
        <MdMoreHoriz size={25} color="#C6C6C6" />
      </TransparentButton>
      <div>
        {visu && (
          <button onClick={handleVisualization} type="button">
            <MdVisibility size={20} color="#8E5BE8" />
            Visualizar
          </button>
        )}
        {edit && (
          <Link
            to={{
              pathname: editPath,
              state: edit,
            }}
          >
            <MdCreate size={20} color="#4D85EE" />
            Editar
          </Link>
        )}
        {excludePath && (
          <button onClick={handleExclude} type="button">
            <MdDeleteForever size={20} color="#DE3B3B" />
            {excludeName || 'Excluir'}
          </button>
        )}
      </div>
    </Options>
  );
}

OptionsComp.propTypes = {
  edit: PropTypes.any,
  editPath: PropTypes.string,
  setVisu: PropTypes.any,
  visu: PropTypes.any,
  excludeName: PropTypes.string,
  excludePath: PropTypes.string,
};

OptionsComp.defaultProps = {
  edit: null,
  editPath: '/',
  setVisu: null,
  visu: null,
  excludeName: null,
  excludePath: null,
};
