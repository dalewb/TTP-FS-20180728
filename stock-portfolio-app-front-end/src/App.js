import React, { Component } from 'react';
import './styles/App.css';
import AppRouter from './routers/AppRouter';

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
    }
  }

  setUser = (userData, email, password) => {
    const returnUser = userData.filter(user => {
      return user.email === email && user.password === password
    })
    // debugger
    if (returnUser) {
      this.setState({
        user: returnUser[0]
      })
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
        <AppRouter getUser={this.getUser} user={this.state.user}/>
      </div>
    );
  }
}

export default App;
