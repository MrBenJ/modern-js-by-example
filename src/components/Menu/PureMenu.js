// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';

import { type MenuLink } from './Menu';

type MenuProps = {
  className?: ?string,
  links: Array<MenuLink>
};

type MenuState = {
  open: boolean
};

export default class PureMenu extends Component<MenuProps, MenuState> {
  constructor(props: MenuProps) {
    super(props);

    this.state = {
      open: false
    };
  }

  /**
   * Opens or closes the menu
   * @return {undefined}
   */
  handleClick = (): void => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { className, links } = this.props;
    const { open } = this.state;

    return (
      <div className={classNames(className, { open })}>
        <div className="menu-content">
          <div className="menu-icon" onClick={this.handleClick}>
            <i className="fa fa-bars" aria-hidden="true" />
          </div>
          <div className="link-container">
            <div className="link-wrapper">
              <Link to="/">Back to homepage</Link>
            </div>
            {links.map( link => {
              const { title, chapter, path } = link;
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
  }
}
