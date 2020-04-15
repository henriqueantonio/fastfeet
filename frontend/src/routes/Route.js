import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import { store } from '~/store';

// Layouts
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({ children, isPrivate, path }) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return <Route path={path} render={() => <Layout>{children}</Layout>} />;
}

RouteWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  isPrivate: PropTypes.bool,
  path: PropTypes.string.isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
