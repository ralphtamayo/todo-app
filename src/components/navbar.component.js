import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth.context';

const navbar = () => (
  <AuthContext.Consumer>
    {context => (
      <nav className="nav nav-pills flex-column flex-sm-row">
        {context.token && (
          <React.Fragment>
            <NavLink to="/" className="flex-sm-fill text-sm-center nav-link">Tasks</NavLink>
            <a className="flex-sm-fill text-sm-center nav-link" href="#" onClick={ context.logout }>Logout</a>
          </React.Fragment>
        )}
        {!context.token && (
          <React.Fragment>
            <NavLink to="/login" className="flex-sm-fill text-sm-center nav-link">Login</NavLink>
            <NavLink to="/register" className="flex-sm-fill text-sm-center nav-link">Register</NavLink>
          </React.Fragment>
        )}
      </nav>
    )}
  </AuthContext.Consumer>
);

export default navbar;
