import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/header.css';

const padding = {
  padding: '5px'
}

class Header extends Component {

  render() {
    return (
      <div className="content-container">
        <NavLink to="/" activeClassName="is-active" exact={true} className="header__title">Portfolio</NavLink>
        <NavLink to="/transactions" activeClassName="is-active" className="header__title">Transactions</NavLink>
        <NavLink to="/register" activeClassName="is-active" className="header__title">Register</NavLink>
        {!sessionStorage.user ? <NavLink to="/signin" activeClassName="is-active" className="header__title">Log In</NavLink> : null}
        {sessionStorage.user ? <NavLink to="/signout" activeClassName="is-active" className="header__title">Log Out</NavLink> : null}
      </div>
    )
  }
}

export default Header;
