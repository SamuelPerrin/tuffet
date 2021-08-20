import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = props => {
  const { currentUser, roles, component: Component, path, exact, ...rest } = props;
  const acceptedRoles = roles || ["ADMIN", "USER"];

  return (
    <Route 
      {...rest}
      exact={exact}
      path={path}
      render={routeProps => {
        if (!currentUser || !acceptedRoles.includes(currentUser.role)) return <Redirect to="/login" />;
        return <Component {...routeProps} />
      }}
    />
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, {  })(PrivateRoute)
