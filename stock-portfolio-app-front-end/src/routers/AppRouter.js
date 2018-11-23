import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from '../components/header';
import Portfolio from '../components/portfolio';
import Transactions from '../components/transactions';
import SignIn from '../components/signIn';
import Register from '../components/register';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Portfolio} exact={true} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
