// @flow
import React, { type Node } from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layout';

const SecondPage = (): Node => (
  <Layout>
    Book page!
    <br/>
    <Link to="/">Return home</Link>
  </Layout>
)

export default SecondPage;
