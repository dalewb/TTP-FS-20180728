import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: '',
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
      console.log(this.state)
      this.setState({
        errors: ''
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    return (
      <div>
        <h3>Registration Page</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Confirm Password:
            <input
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        {this.state.errors.length > 0 && <p>{this.state.errors}</p>}
      </div>
    )
  }
}

export default Register;
