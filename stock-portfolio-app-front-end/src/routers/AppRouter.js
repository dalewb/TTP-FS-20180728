import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
        <Route path="/" component={sessionStorage.user ? Portfolio : null} exact={true} />
        <Route path="/transactions" component={sessionStorage.user ? Transactions : null} />
        <Route path="/signin" render={() => {
            if (sessionStorage.user) {
              return <Redirect to="/" />
            }
            return <SignIn getUser={props.getUser} user={props.user} loggedIn={props.loggedIn}/>
        }} />
        <Route path="/signout" render={() => {
            if (!sessionStorage.user) {
              return <Redirect to="signin" />
            }
            return <SignOut getUser={props.getUser} user={props.user} logOut={props.logOut}/>
        }} />
      <Route path="/register" render={() => {
          if (props.loggedIn) {
            return <Redirect to="/" />
          }
          return <Register logIn={props.logIn}/>
        }} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default AppRouter
