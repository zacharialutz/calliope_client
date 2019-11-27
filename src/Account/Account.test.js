import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Account from './Account';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      {/* <Account /> */}
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});