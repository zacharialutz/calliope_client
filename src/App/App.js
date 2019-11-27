import React from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';

import ApiContext from '../ApiContext';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav.js';
import Footer from '../Footer/Footer.js';
import LandingPage from '../LandingPage/LandingPage.js';
import Generator from '../Generator/Generator';
import Account from '../Account/Account';
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';
import NewStory from '../NewStory/NewStory';

import './App.css'

export default withRouter(class App extends React.Component {
  state = {
    filter: {
      modern: true,
      historic: true,
      scifi: true,
      fantasy: true
    },
    num: 3,
    list: [],
    stories: [],
    username: null,
    userId: null,
    loading: false,
    error: null
  }

  // Update state after generate submit
  onSubmit = stories => {
    this.setState({
      stories: stories.map(item => <NewStory key={uuid()} content={item} />)
    })
  }

  // Update user after login or signup
  onLogin = user => {
    console.log(user);
    this.setState({
      username: user.username,
      userId: user.id
    });
    this.props.history.push(`/account`);
  }

  render() {
    const ctx = {
      filter: this.state.filter,
      num: this.state.num,
      list: this.state.list,
      stories: this.state.stories,
      username: this.state.username,
      error: this.state.error,
      onSubmit: this.onSubmit,
      onLogin: this.onLogin
    }

    return (
      <ApiContext.Provider value={ctx}>
        <div className='App'>
          <Nav user={this.state.user} />
          <main className='content' aria-live='polite'>
            <Route
              exact path='/'
              component={LandingPage}
            />
            <Route
              path='/generator'
              component={Generator}
            />
            <Route
              path='/account'
              component={Account}
            />
            <Route
              path='/login'
              component={Login}
            />
            <Route
              path='/signup'
              component={Signup}
            />
          </main>
          <Footer />
        </div>
      </ApiContext.Provider>
    );
  }
})