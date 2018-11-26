import React, { Component } from 'react';
import '../styles/userInput.css';

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
  }

  render() {
    return (
      <div className="user-form">
        <h3 className="user-form__title">Log In</h3>
        <form onSubmit={this.handleSubmit} className="user-form__form">
          <label className="user-form__label">Email:</label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange}
            className="user-form__input"
          />
          <label className="user-form__label">Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            className="user-form__input"
          />
          <input
            className="submitButton"
            type="submit"
            value="Submit"/>
        </form>
      </div>
    )
  }
}

export default SignIn;
