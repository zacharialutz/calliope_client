import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Generator from './Generator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Generator />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});