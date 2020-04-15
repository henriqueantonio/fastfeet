import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

import Options from '~/components/Options';
import Modal from '~/components/Modal';

import api from '~/services/api';

import { Container, Table, ModalContainer, Title } from './styles';

export default function Problem() {
  const [problems, setProblems] = useState([]);
  const [visu, setVisu] = useState({});
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function handleProblems() {
      const response = await api.get('/problems', {
        params: { page: actualPage },
      });
      setTotalPages(response.data.totalPages);

      const result = response.data.rows.map(problem => ({
        ...problem,
        formatted_id: format(new Date().setFullYear(problem.id), 'yy'),
      }));

      setProblems(result);
    }
    handleProblems();
  }, [actualPage]);
  return (
    <Container>
      <Title>Problemas na entrega</Title>
      <Table
        actualPage={actualPage}
        setActualPage={setActualPage}
        totalPages={totalPages}
        head={['Encomenda', 'Problema']}
        body={problems.map(item => (
          <tr>
            <td>#{item.formatted_id}</td>
            <td>{item.description}</td>
            <td>
              <Options
                visu={item}
                setVisu={setVisu}
                excludeName="Cancelar"
                excludePath={`/problem/${item.id}/cancel-delivery`}
              />
            </td>
          </tr>
        ))}
      />
      <Modal
        modalIsOpen={(Object.keys(visu).length && true) || false}
        setModalIsOpen={setVisu}
      >
        <ModalContainer>
          <strong>VISUALIZAR PROBLEMA</strong>
          <div>{visu.description && visu.description}</div>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
