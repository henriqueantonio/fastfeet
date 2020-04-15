import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Options from '~/components/Options';
import ManageHeader from '~/components/ManageHeader';

import api from '~/services/api';

import { Container, DeliverymanPhoto, Table } from './styles';

export default function Deliveryman({ isFocused }) {
  const [deliverymen, setDeliverymen] = useState([]);
  const [search, setSearch] = useState('');
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function handleDeliverymen() {
      const response = await api.get('/deliverymen', {
        params: { page: actualPage },
      });

      setTotalPages(response.data.totalPages);

      const result = response.data.rows.map(delivery => ({
        ...delivery,
        formatted_id: format(new Date().setFullYear(delivery.id), 'yy'),
      }));
      setDeliverymen(result);
    }
    handleDeliverymen();
  }, [actualPage, isFocused]);

  function handleSearchFilter() {
    if (search === '') {
      return deliverymen;
    }
    return deliverymen.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <Container>
      <ManageHeader
        setSearch={setSearch}
        title="entregadores"
        registerPath="/deliveryman/register"
      />
      <Table
        actualPage={actualPage}
        setActualPage={setActualPage}
        totalPages={totalPages}
        head={['ID', 'Foto', 'Nome', 'Email']}
        body={handleSearchFilter().map(item => (
          <tr key={item.id}>
            <td>#{item.formatted_id}</td>
            <td>
              <DeliverymanPhoto src={item.avatar.url} />
            </td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
              <Options
                edit={item}
                editPath="/deliveryman/edition"
                excludePath={`/deliverymen/${item.id}`}
              />
            </td>
          </tr>
        ))}
      />
    </Container>
  );
}

Deliveryman.propTypes = {
  isFocused: PropTypes.bool,
};

Deliveryman.defaultProps = {
  isFocused: false,
};
