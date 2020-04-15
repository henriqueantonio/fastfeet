import styled from 'styled-components';

export const Container = styled.div`
  overflow-x: auto;
  display: flex;

  table {
    width: 100%;
    margin-top: 25px;
    border-spacing: 0 20px;
    table-layout: auto;

    th,
    td {
      padding: 15px;
      text-align: left;
    }

    thead {
      th:last-child {
        text-align: right;
      }

      td {
        color: #444444;
        font-size: 16px;
      }
    }

    tbody {
      td:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      td + td {
        overflow: hidden;
      }

      td:last-child {
        overflow: visible;
        text-align: right;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      td {
        color: #666666;
        font-size: 16px;
        background: #fff;
      }
    }
  }
`;
