// @flow
import { css } from 'emotion';

import { COLORS as c } from '../../constants';
import { HEADER_HEIGHT } from '../Header';

const ICON_SPACING = 1;
const MENU_WIDTH = '25vw';


export default css`


  .menu-icon {
    position: fixed;
    left: ${ICON_SPACING}rem;
    top: ${ICON_SPACING + .5}rem;
    z-index: 2;
    cursor: pointer;

    i {
      font-size: 2rem;
      color: ${c.white};
    }
  }

  .menu-content {
    position: relative;
  }

  .link-container {
    position: absolute;
    left: -${MENU_WIDTH};
    top: ${HEADER_HEIGHT};
    height: 100vh;
    width: ${MENU_WIDTH};
    z-index: 2;
    background-color: ${c.primary};
    transition: all .5s ease-in-out;

    padding-left: 2rem;

    .link-wrapper {
      margin: 1rem 0;
    }
    a {
      color: ${c.black};

      &:visited {
        color ${c.black};
      }

      &:hover {
        color: ${c.light};
      }
    }
  }

  &.open {
    .link-container {
      position: fixed;
      left: 0;
    }
  }
`;
