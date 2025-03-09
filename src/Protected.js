import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'useAuth';

function Protected({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/authenticate/sign-in" />
        )
      }
    />
  );
}

export default Protected;