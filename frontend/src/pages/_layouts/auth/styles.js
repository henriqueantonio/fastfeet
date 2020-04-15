import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  padding: 50px 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      align-self: flex-start;
      font-size: 14px;
      font-weight: bold;
      color: #444444;
      margin: 0 0 10px;
    }

    span {
      color: #f64c76;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      background: #fff;
      border: 1px solid #dddd;
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: #222;
      margin: 0 0 15px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.primary};
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, colors.primary)};
      }
    }
  }
`;
