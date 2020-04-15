import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 719px) {
    overflow-y: auto;
  }

  box-shadow: 1px 0 0 #dddddd;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    div {
      @media (max-width: 719px) {
        flex-wrap: nowrap;
      }

      display: flex;
      flex-wrap: wrap;
    }

    img {
      height: 26px;
      object-fit: contain;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      margin: 0 10px;
    }
  }

  aside {
    @media (max-width: 719px) {
      flex-direction: row;

      strong {
        margin: 0 10px;
      }
    }

    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;

    strong {
      display: block;
      color: #666666;
    }
    button {
      display: block;
      background-color: transparent;
      border: none;
      cursor: pointer;
      margin: 0;
      padding: 0;
      color: #de3b3b;
    }
  }
`;

export const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.selected ? '#444444' : '#999999')};
`;
