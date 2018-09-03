// @flow
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage';

export default function Routes(): Fragment {
  return (
    <Fragment>
      <Route exact path="/" component={IndexPage} />
    </Fragment>
  );
}
