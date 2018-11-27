import React, { Component } from 'react';
import '../styles/signOut.css'

class SignOut extends Component {

  logOutLogic = () => {
    sessionStorage.removeItem('user')
    this.props.logOut()
  }

  render() {
    return (
      <div>
        <button onClick={this.logOutLogic} className="log-out__button">Log Out</button>
      </div>
    )
  }
};

export default SignOut;
