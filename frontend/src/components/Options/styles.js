import styled from 'styled-components';

export const TransparentButton = styled.button`
  border: 0;
  background: transparent;
`;

export const Options = styled.div.attrs({
  tabIndex: '0',
})`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    position: absolute;
    z-index: 5;
    top: 20px;
    display: ${props => (props.enabled ? 'flex' : 'none')};
    flex-direction: column;
    padding: 10px;
    width: 150px;
    background: #ffff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);

    svg {
      margin-right: 5px;
    }

    button {
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      box-shadow: 0 0 0;
      width: auto;
      top: 0;
      border: 0;
      margin: 0;
      background: transparent;
      border-bottom: 1px solid #eeeeee;
      color: #999999;
      font-size: 16px;
    }

    a {
      padding: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      position: relative;
      box-shadow: 0 0 0;
      width: auto;
      top: 0;
      border: 0;
      margin: 0;
      background: transparent;
      border-bottom: 1px solid #eeeeee;
      color: #999999;
      font-size: 16px;
    }

    button:last-child {
      border-bottom: 0;
    }
  }
`;
