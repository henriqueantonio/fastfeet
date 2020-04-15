import styled from 'styled-components';

export const InputButton = styled.div`
  @media (max-width: 650px) {
    margin-bottom: 10px;
  }

  display: flex;
  padding-left: 10px;
  height: 36px;
  width: 238px;
  background: #fff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  align-items: center;

  input {
    font-size: 15px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding-left: 10px;
    background: #fff;
    margin: 0;
    border: 0;
    height: 100%;
    width: 100%;
  }
`;
