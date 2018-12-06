// @flow
import React, { type Node } from 'react';
import Layout from '../components/Layout';

const NotFoundPage = (): Node => (
  <Layout>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage;
