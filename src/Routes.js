// @flow
import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

export default function Routes(): Fragment {
  return (
    <Fragment>
      <Route exact path="/" component={<div>Hello!</div>} />
    </Fragment>
  );
}
