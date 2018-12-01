import React from 'react';
import { Link } from 'gatsby';

import style from './Header.style';
const Header = ({ siteTitle }) => (
  <div className={style}>
    <div className="container">
      <h1 className="heading">
        <Link
          className="link"
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header;
