import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import DeliveryModal from './DeliveryModal';

import ManageHeader from '~/components/ManageHeader';

import api from '~/services/api';

import { Container, Table, Deliveryman, Status, Options } from './styles';

export default function Delivery({ isFocused }) {
  const [deliveries, setDeliveries] = useState([]);
  const [visu, setVisu] = useState({});
  const [search, setSearch] = useState('');
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function handleDeliveries() {
      const response = await api.get('/deliveries', {
        params: { page: actualPage },
      });

      setTotalPages(response.data.totalPages);

      const result = response.data.rows.map(delivery => ({
        status: (delivery.canceled_at && 2) || (delivery.end_date && 1) || 0,
        ...delivery,
        formatted_id: format(new Date().setFullYear(delivery.id), 'yy'),
      }));
      setDeliveries(result);
    }
    handleDeliveries();
  }, [visu, isFocused, actualPage]);

  function handleSearchFilter() {
    if (search === '') {
      return deliveries;
    }
    return deliveries.filter(e =>
      e.product.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <Container>
      <ManageHeader
        setSearch={setSearch}
        title="encomendas"
        registerPath="/delivery/register"
      />
      <Table
        actualPage={actualPage}
        setActualPage={setActualPage}
        totalPages={totalPages}
        head={[
          'ID',
          'Destinatário',
          'Entregador',
          'Cidade',
          'Estado',
          'Status',
        ]}
        body={handleSearchFilter().map(item => (
          <tr key={item.id}>
            <td>#{item.formatted_id}</td>
            <td>
              {(item.recipient && item.recipient.name) || 'Não existente'}
            </td>
            <td>
              <Deliveryman>
                {item.deliveryman && item.deliveryman.avatar ? (
                  <img src={item.deliveryman.avatar.url} alt="avatar" />
                ) : (
                  <div>NE</div>
                )}
                {(item && item.deliveryman && item.deliveryman.name) ||
                  'Não existente'}
              </Deliveryman>
            </td>
            <td>
              {(item.recipient && item.recipient.city) || 'Não existente'}
            </td>
            <td>
              {(item.recipient && item.recipient.state) || 'Não existente'}
            </td>
            <td>
              <Status status={item.status}>
                <div status={item.status} />
                {(item.status === 0 && 'Pendente') ||
                  (item.status === 1 && 'Entregue') ||
                  (item.status === 2 && 'Cancelado')}
              </Status>
            </td>
            <td>
              <Options
                visu={item}
                setVisu={setVisu}
                edit={item}
                editPath="/delivery/edition"
                excludePath={`/deliveries/${item.id}`}
              />
            </td>
          </tr>
        ))}
      />
      <DeliveryModal setVisu={setVisu} visu={visu} />
    </Container>
  );
}

Delivery.propTypes = {
  isFocused: PropTypes.bool,
};

Delivery.defaultProps = {
  isFocused: false,
};
