// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { StaticQuery, graphql } from 'gatsby';

import PureMenu from './PureMenu';
import style from './Menu.style';

type Props = {
  className?: ?string
};

type State = {};

export type MenuLink = {
  title: string,
  chapter: string,
  path: string
};

type GQLMenuLinkEdge = {
  node: {
    frontmatter: {
      title: string,
      chapter: string,
      path: string
    }
  }
};

export default class Menu extends Component<Props, State> {
  render() {
    const { className } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark(sort: { order: ASC, fields: frontmatter___chapter}) {
              edges {
                node {
                  frontmatter {
                    title
                    chapter
                    path
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const { edges } = data.allMarkdownRemark;
          const links = edges.map( (link: GQLMenuLinkEdge): MenuLink => {
            const { title, chapter, path } = link.node.frontmatter;
            return {
              title,
              chapter,
              path
            };
          });

          return <PureMenu css={style} className={className} links={links} />;
        }}
      />
    );
  }


}
