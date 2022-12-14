import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Loggedout = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path} 
        exact={exact}
        render={props => !loggedIn ? <Component{...props} />
            : <Redirect to="/" />
        }
    />
);

const mapStateToProps = (state) => ({
    loggedIn: Boolean(state.session.id)
  });
  
  export const LoggedoutRoute = withRouter(
      connect(mapStateToProps, null)(Loggedout)
  )

