// @flow
import React, { type Node } from 'react';
import { Link } from 'gatsby';

import style from './Header.style';

type HeaderProps = {
  siteTitle: string
};

const Header = ({ siteTitle }: HeaderProps): Node => (
  <div className={style}>
    <div className="container">
      <h1 className="heading">
        <Link to="/" className="link">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
);

export default Header;
