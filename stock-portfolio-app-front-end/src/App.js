import React, { Component } from 'react';
import './styles/App.css';
import AppRouter from './routers/AppRouter';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      loggedIn: false,
    }
  }

  logOut = () => {
    this.setState({
      loggedIn: false
    })
  }

  logIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  setUser = (userData, email, password) => {
    const returnUser = userData.filter(user => {
      return user.email === email && user.password === password
    })
    if (returnUser.length === 1) {
      sessionStorage.setItem("user", JSON.stringify(returnUser[0]))
      this.setState({
        loggedIn: true,
      })
    } else {
      alert("Incorrect Email or Password")
    }
  }

  getUser = (email, password) => {
    fetch("http://localhost:3000/api/v1/users/")
      .then(res => res.json())
      .then(json => this.setUser(json.data, email, password))
  }

  render() {
    return (
      <div>
        <AppRouter
          getUser={this.getUser}
          user={this.state.user}
          logOut={this.logOut}
          logIn={this.logIn}
          loggedIn={this.state.loggedIn}
          signInError={this.state.signInError}
        />
      </div>
    );
  }
}

export default App;
