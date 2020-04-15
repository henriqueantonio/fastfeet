import React from 'react';
import PropTypes from 'prop-types';

import Pagination from '~/components/Pagination';
import Empty from '~/components/Empty';

import { Container } from './styles';

export default function Table({
  head,
  body,
  style,
  totalPages,
  actualPage,
  setActualPage,
}) {
  return (
    <>
      {body.length !== 0 ? (
        <>
          <Container style={style}>
            <table>
              <thead>
                <tr>
                  {head.map(item => (
                    <th key={item}>{item}</th>
                  ))}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>{body}</tbody>
            </table>
          </Container>
          <Pagination
            actualPage={actualPage}
            setActualPage={setActualPage}
            totalPages={totalPages}
          />
        </>
      ) : (
        <Empty />
      )}
    </>
  );
}

Table.propTypes = {
  head: PropTypes.arrayOf(PropTypes.string).isRequired,
  body: PropTypes.any,
  style: PropTypes.objectOf(PropTypes.object),
  totalPages: PropTypes.number,
  actualPage: PropTypes.number,
  setActualPage: PropTypes.any.isRequired,
};

Table.defaultProps = {
  body: [],
  style: null,
  totalPages: 1,
  actualPage: 1,
};
