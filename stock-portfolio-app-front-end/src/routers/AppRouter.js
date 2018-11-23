import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from '../components/header';
import Portfolio from '../components/portfolio';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Portfolio} exact={true} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
