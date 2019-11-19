import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SavedStory from './SavedStory';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SavedStory />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});