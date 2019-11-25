import React from 'react';
import uuid from 'uuid';
import config from '../config';

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

export default class App extends React.Component {
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
    error: null
  }

  // Loads list of saved stories
  componentDidMount() {
    fetch(config.API_ENDPOINT + `/stories`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(stories => this.setState({ stories }))
      .catch(error => this.setState({ error }))
  }

  onSubmit = stories => {
    this.setState({
      stories: stories.map(item => <NewStory key={uuid()} content={item} />)
    })
  }

  render() {
    const ctx = {
      filter: this.state.filter,
      num: this.state.num,
      list: this.state.list,
      stories: this.state.stories,
      username: this.state.username,
      error: this.state.error,
      onSubmit: this.onSubmit
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
}