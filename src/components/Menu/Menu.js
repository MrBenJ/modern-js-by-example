// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import { StaticQuery, Link, graphql } from 'gatsby';

import style from './Menu.style';

type MenuProps = {
  className?: ?string
};

export default function Menu({ className }: MenuProps): Node {
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

        return (
          <div className={classNames(style, className)}>
            <div className="link-container">
              <div>
                <Link to="/">Back to homepage</Link>
              </div>
              {edges.map( item => {
                const { title, chapter, path } = item.node.frontmatter;
                return (
                  <div key={title}>
                    <Link
                      className="link"
                      key={title}
                      to={path}
                      >
                      {chapter}: {title}
                    </Link>
                  </div>
                )
              })}
            </div>
            <div className="menu-arrow">
              <i className="fa fa-caret-right" />
            </div>
          </div>
        );
      }}
    />
  );
}
