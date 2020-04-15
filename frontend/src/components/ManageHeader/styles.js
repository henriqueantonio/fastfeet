import styled from 'styled-components';
import ButtonComp from '~/components/Button';
import SearchButtonComp from '~/components/SearchButton';

export const Container = styled.div`
  @media (max-width: 650px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    color: #444444;
    font-weight: bold;
    font-size: 24px;
  }
`;

export const Header = styled.div`
  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`;

export const SearchButton = styled(SearchButtonComp)``;

export const Button = styled(ButtonComp)``;
