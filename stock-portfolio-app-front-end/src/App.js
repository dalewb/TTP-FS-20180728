import React, { Component } from 'react';
import './styles/App.css';
import AppRouter from './routers/AppRouter';

class App extends Component {
  render() {
    return (
      <AppRouter />
    );
  }
}

export default App;
