import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Container, Content, Title } from './styles';
import logo from '~/assets/fastfeet.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const name = useSelector(state => state.user.profile.name);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Fastfeet" />
          </Link>
          <div>
            <Link to="/">
              <Title selected={location.pathname === '/'}>ENCOMENDAS</Title>
            </Link>
            <Link to="/deliverymen">
              <Title selected={location.pathname === '/deliverymen'}>
                ENTREGADORES
              </Title>
            </Link>
            <Link to="/recipients">
              <Title selected={location.pathname === '/recipients'}>
                DESTINATÁRIOS
              </Title>
            </Link>
            <Link to="/problems">
              <Title selected={location.pathname === '/problems'}>
                PROBLEMAS
              </Title>
            </Link>
          </div>
        </nav>
        <aside>
          <strong>{name}</strong>
          <button onClick={handleLogout} type="button">
            Sair do sistema
          </button>
          <div />
        </aside>
      </Content>
    </Container>
  );
}
