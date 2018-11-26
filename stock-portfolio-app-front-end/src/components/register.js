import React, { Component } from 'react';
import '../styles/userInput.css';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: '',
    }
  }

  catchUserError = (json) => {
    if (json.status === "ERROR") {
      this.setState({
        errors: "Email already exists"
      })
    } else {
      sessionStorage.setItem("user", JSON.stringify(json.data))
      this.props.logIn()
    }
  }

  addUser = () => {
    const userData = JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      account: 5000,
    })
    if (this.state.name && this.state.email && this.state.password) {
      fetch('http://localhost:3000/api/v1/users/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        body: userData
      })
      .then(res => res.json())
      .then(json => this.catchUserError(json))
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        password: '',
        confirmPassword: '',
        errors: "Passwords must match"
      })
    } else {
      this.setState({
        errors: ''
      })
      this.addUser()
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    return (
      <div className="user-form">
        <h3 className="user-form__title">Register</h3>
        <form onSubmit={this.handleSubmit} className="user-form__form">
          <label className="user-form__label">Name:</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            className="user-form__input"
          />
          <label className="user-form__label">Email:</label>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="user-form__input"
          />
          <label className="user-form__label">Password:</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="user-form__input"
          />
          <label className="user-form__label">Confirm Password:</label>
          <input
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            className="user-form__input"
          />
        <input
          type="submit"
          value="Submit"
          className="submitButton"/>
        </form>
        {this.state.errors && <p>{this.state.errors}</p>}
      </div>
    )
  }
}

export default Register;
