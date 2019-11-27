import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';

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
    savedStories: [],
    username: null,
    userId: null,
    loading: false,
    error: null
  }

  // Update state after generate submit
  onSubmit = stories => {
    this.setState({
      stories: stories.map(item => <NewStory key={stories.indexOf(item)} id={stories.indexOf(item)} content={item} />),
      savedStories: []
    })
  }

  // Update user after login or signup
  onLogin = user => {
    this.setState({
      username: user.username,
      userId: user.id
    });
    this.props.history.push('/generator');
  }

  // Updates list of saved stories in NewStory to disable save button
  updateSaved = id => {
    const newSavedList = this.state.savedStories;
    newSavedList.push(id);
    this.setState({ savedStories: newSavedList });
  }

  // Update list for loading stories
  updateList = newList => {
    this.setState({ list: newList });
  }

  // Update list for deletion of a story
  handleDelete = id => {
    console.log(id);
    console.log(this.state.list);
    const newList = this.state.list.filter(item => item.id !== id);
    this.setState({ list: newList });
    console.log(this.state.list);
  }

  render() {
    const ctx = {
      filter: this.state.filter,
      num: this.state.num,
      list: this.state.list,
      stories: this.state.stories,
      savedStories: this.state.savedStories,
      username: this.state.username,
      userId: this.state.userId,
      error: this.state.error,
      onSubmit: this.onSubmit,
      onLogin: this.onLogin,
      updateSaved: this.updateSaved,
      updateList: this.updateList,
      handleDelete: this.handleDelete,
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