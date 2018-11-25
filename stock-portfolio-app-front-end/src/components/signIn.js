import React, { Component } from 'react';

class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  render() {
    return (
      <div>
        <p>SignIn Page</p>
        <form>
          <label>
            Email:
            <input type="text" value={this.state.email}/>
          </label>
          <label>
            Password:
            <input type="text" value={this.state.password}/>
          </label>
        </form>
      </div>
    )
  }
}

export default SignIn;
