import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Page } from './styles';

export default function Pagination({
  totalPages = 90,
  actualPage = 1,
  setActualPage,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    function handlePagination() {
      const list = [];
      // get the max of pages on left and right
      const max = 3;

      // cont to test the max pages on left and right
      let cont = 0;

      // left
      for (let i = actualPage; i >= 1; i -= 1) {
        if (i !== actualPage && cont < max) {
          list.push(i);
          cont += 1;
        }
      }

      // reverse list to became ordened
      list.reverse();

      // right
      cont = 0;
      for (let i = actualPage; i <= totalPages; i += 1) {
        if (cont <= max) {
          list.push(i);
          cont += 1;
        }
      }
      return list;
    }
    setData(handlePagination({ totalPages, actualPage }));
  }, [totalPages, actualPage]);

  return (
    <Container>
      {data.map(page => (
        <Page
          key={page}
          active={page === actualPage}
          onClick={() => setActualPage(page)}
        >
          <strong>{page}</strong>
        </Page>
      ))}
    </Container>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  actualPage: PropTypes.number.isRequired,
  setActualPage: PropTypes.any.isRequired,
};
