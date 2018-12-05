// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { StaticQuery, Link, graphql } from 'gatsby';

import style from './Menu.style';

type Props = {
  className?: ?string
};

type State = {
  open: boolean
};

export default class Menu extends Component<Props, State> {
  constructor(props: MenuProps) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { className } = this.props;
    const { open } = this.state;
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
            <div className={classNames(style, className, { open })}>
              <div className="menu-content">
                <div className="menu-icon" onClick={this.handleClick}>
                  <i className="fa fa-bars" aria-hidden="true" />
                </div>
                <div className="link-container">
                  <div className="link-wrapper">
                    <Link to="/">Back to homepage</Link>
                  </div>
                  {edges.map( item => {
                    const { title, chapter, path } = item.node.frontmatter;
                    return (
                      <div
                        key={title}
                        className="link-wrapper">
                        <Link
                          className="link"
                          key={title}
                          to={path}
                          >
                          {chapter}: {title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }}
      />
    );
  }


}
