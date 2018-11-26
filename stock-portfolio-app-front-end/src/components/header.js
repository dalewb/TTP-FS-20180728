import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const padding = {
  padding: '5px'
}

class Header extends Component {

  render() {
    return (
      <div style={{background: '#d3d3d3'}}>
        <p>Header</p>
          <NavLink to="/" activeClassName="is-active" exact={true} style={padding}>Portfolio</NavLink>
          <NavLink to="/transactions" activeClassName="is-active" style={padding}>Transactions</NavLink>
          <NavLink to="/register" activeClassName="is-active" style={padding}>Register</NavLink>
          {!sessionStorage.user ? <NavLink to="/signin" activeClassName="is-active" style={padding}>Log In</NavLink> : null}
          {sessionStorage.user ? <NavLink to="/signout" activeClassName="is-active" style={padding}>Log Out</NavLink> : null}
      </div>
    )
  }
}

export default Header;
