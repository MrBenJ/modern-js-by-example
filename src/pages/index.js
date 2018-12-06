// @flow
import React, { type Node } from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';

const IndexPage = (): Node => (
  <Layout>
    <p>A book by Ben Junya</p>
    <p>Check out the book!</p>
    <Link to="/book">View book</Link>
  </Layout>
)

export default IndexPage;
