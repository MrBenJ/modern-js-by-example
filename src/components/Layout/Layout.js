// @flow
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from '../Header';
import Menu from '../Menu';

// Layout style
import style from './Layout.style';

type LayoutProps = {
  children: Node
};

const Layout = ({ children }: LayoutProps): Node => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'A free online book on modern Javascript' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Menu />
        <div css={style}>
          <div className="container container-with-header">
            {children}
          </div>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
