import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: props.user
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
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
        {console.log("SignIn props are ", this.props)}
      </div>
    )
  }
}

export default SignIn;
