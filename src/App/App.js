import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';
import './App.css'

import Nav from '../Nav/Nav.js';
import Footer from '../Footer/Footer.js';
import Generator from '../Generator/Generator';
import Account from '../Account/Account';
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';
import NewStory from '../NewStory/NewStory';
import About from '../About/About';

export default withRouter(class App extends React.Component {
  state = {
    modern: true,
    historic: true,
    scifi: true,
    fantasy: true,
    num: 3,

    list: [],
    stories: [],
    username: null,
    userId: null,
    loading: false,
    error: null
  }
  ghostState = {
    savedStories: []
  }

  // Input control for generator inputs
  handleChangeModern = e => {
    this.setState({ modern: e.target.checked });
  }
  handleChangeHistoric = e => {
    this.setState({ historic: e.target.checked });
  }
  handleChangeScifi = e => {
    this.setState({ scifi: e.target.checked });
  }
  handleChangeFantasy = e => {
    this.setState({ fantasy: e.target.checked });
  }
  handleChangeNum = e => {
    this.setState({ num: e.target.value });
  }

  // Update state after generate submit
  onSubmit = stories => {
    this.ghostState.savedStories = [];
    this.setState({
      stories: stories.map(item =>
        <NewStory
          key={stories.indexOf(item)}
          id={stories.indexOf(item)}
          content={item}
        />
      )
    })
  }

  // Update user after login or signup
  onLogin = user => {
    this.setState({
      username: user.username,
      userId: user.id
    });
    this.props.history.push('/');
  }

  // Updates list of saved stories in NewStory to disable save button
  updateSaved = id => {
    this.ghostState.savedStories.push(id);
  }

  // Update list for loading stories
  updateList = newList => {
    this.setState({ list: newList });
  }

  // Update after editing
  updateStory = newStory => {
    const newList = this.state.list.map(item => (item.id !== newStory.id) ? item : newStory);
    this.setState({ list: newList })
  }

  // Update list for deletion of a story
  handleDelete = id => {
    const newList = this.state.list.filter(item => item.id !== id);
    this.setState({ list: newList });
  }

  render() {
    const ctx = {
      modern: this.state.modern,
      historic: this.state.historic,
      scifi: this.state.scifi,
      fantasy: this.state.fantasy,
      num: this.state.num,

      list: this.state.list,
      stories: this.state.stories,
      username: this.state.username,
      userId: this.state.userId,
      error: this.state.error,

      savedStories: this.ghostState.savedStories,

      onSubmit: this.onSubmit,
      onLogin: this.onLogin,

      updateSaved: this.updateSaved,
      updateList: this.updateList,
      updateStory: this.updateStory,
      handleDelete: this.handleDelete,

      handleChangeModern: this.handleChangeModern,
      handleChangeHistoric: this.handleChangeHistoric,
      handleChangeScifi: this.handleChangeScifi,
      handleChangeFantasy: this.handleChangeFantasy,
      handleChangeNum: this.handleChangeNum
    }

    return (
      <ApiContext.Provider value={ctx}>
        <div className='App'>
          <Nav user={this.state.user} />
          <header className='hero' role="banner">
            <h1>Calliope</h1>
            <p className='subtitle'>(<i>ka-LY-a-pee</i>) the Muse of Writing</p>
          </header>
          <main className='content' aria-live='polite'>
            <Route
              exact path='/'
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
            <Route
              path='/about'
              component={About}
            />
          </main>
          <Footer />
        </div>
      </ApiContext.Provider>
    );
  }
})