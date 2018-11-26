import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <p>Header</p>
          <NavLink to="/" activeClassName="is-active" exact={true}>Portfolio</NavLink>
          <NavLink to="/transactions" activeClassName="is-active">Transactions</NavLink>
      </div>
    )
  }
}

export default Header;
