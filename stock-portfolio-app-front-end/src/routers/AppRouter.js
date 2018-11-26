import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from '../components/header';
import Portfolio from '../components/portfolio';
import Transactions from '../components/transactions';
import SignIn from '../components/signIn';
import SignOut from '../components/signOut';
import Register from '../components/register';

const AppRouter = (props) => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={props.loggedIn ? Portfolio : null} exact={true} />
        <Route path="/transactions" component={props.loggedIn ? Transactions : null} />
        <Route path="/signin" render={() => <SignIn getUser={props.getUser} user={props.user}/>} />
        <Route path="/signout" render={() => <SignOut getUser={props.getUser} user={props.user} logOut={props.logOut}/>} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
