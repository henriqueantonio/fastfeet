import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: center;
    padding: 0;
  }

  padding: 30px 250px;

  span {
    color: #f64c76;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
`;

export const FormView = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 20px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  min-width: 294px;

  label {
    color: #444444;
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0;
  }

  input {
    border-radius: 4px;
    border: 1px solid #dddddd;
    height: 45px;
    padding: 10px;
    font-size: 16px;
  }
`;
