import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: props.user,
      error: '',
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getUser(this.state.email, this.state.password)
    if (!sessionStorage.user) {
      this.setState({
        error: "Invalid Input"
      })
    } else {
      this.setState({
        error: ""
      })
    }
  }

  render() {
    return (
      <div>
        <p>SignIn Page</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmailChange}/>
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    )
  }
}

export default SignIn;
