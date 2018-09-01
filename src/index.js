// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';

import Routes from './Routes';

/*
  Entry point for the website
 */

const root = document.getElementById('root');

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Routes />
    </Switch>
  </HashRouter>,
  root
);
