import React, { Component } from 'react';

class SignOut extends Component {

  logOutLogic = () => {
    sessionStorage.removeItem('user')
    this.props.logOut()
  }

  render() {
    return (
      <div>
        <button onClick={this.logOutLogic}>Log Out</button>
      </div>
    )
  }
};

export default SignOut;
