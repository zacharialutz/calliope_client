import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NewStory from './NewStory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NewStory />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});