import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import Options from '~/components/Options';
import ManageHeader from '~/components/ManageHeader';

import api from '~/services/api';

import { Container, Table } from './styles';

export default function Recipient() {
  const [recipients, setRecipients] = useState([]);
  const [search, setSearch] = useState('');
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function handleRecipients() {
      const response = await api.get('/recipients', {
        params: { page: actualPage },
      });

      setTotalPages(response.data.totalPages);

      const result = response.data.rows.map(delivery => ({
        ...delivery,
        formatted_id: format(new Date().setFullYear(delivery.id), 'yy'),
      }));
      setRecipients(result);
    }
    handleRecipients();
  }, [actualPage]);

  function handleSearchFilter() {
    if (search === '') {
      return recipients;
    }
    return recipients.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <Container>
      <ManageHeader
        setSearch={setSearch}
        title="destinatários"
        registerPath="/recipient/register"
      />
      <Table
        actualPage={actualPage}
        setActualPage={setActualPage}
        totalPages={totalPages}
        head={['ID', 'Nome', 'Endereço']}
        body={handleSearchFilter().map(item => (
          <tr key={item.id}>
            <td>#{item.formatted_id}</td>
            <td>{item.name}</td>
            <td>{`${item.street}, ${item.number}, ${item.city} - ${item.state}`}</td>
            <td>
              <Options
                edit={item}
                editPath="/recipient/edition"
                excludePath={`/recipients/${item.id}`}
              />
            </td>
          </tr>
        ))}
      />
    </Container>
  );
}
