import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    max-width: 400px;
    max-height: 400px;
    overflow: hidden;
  }

  h1 {
    margin-top: 10px;
    color: #333333;
  }

  text-align: center;
  color: #999999;
`;
