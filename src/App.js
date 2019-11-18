import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav/Nav.js';
import Footer from './Footer/Footer.js';
import LandingPage from './LandingPage/LandingPage.js';
import Generator from './Generator/Generator';
import Account from './Account/Account';
import Login from './Login/Login.js';
import Signup from './Signup/Signup.js';

import './App.css'

class App extends Component {
  state = {
    filter: {
      modern: true,
      historic: true,
      scifi: true,
      fantasy: true
    },
    user: null,
    error: null
  }

  render() {
    return (
      <div className = 'App'>
        <Nav user={this.state.user} />
        <main className='content' aria-live='polite'>
          <Route
            exact path='/'
            component={ LandingPage }
          />
          <Route
            path='/generator'
            component={ Generator }
          />
          <Route
            path='/account'
            component={ Account }
          />
          <Route
            path='/login'
            component={ Login }
          />
          <Route
            path='/signup'
            component={ Signup }
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
