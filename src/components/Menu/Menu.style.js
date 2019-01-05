// supress@flow
import { css } from '@emotion/core';

import { COLORS as c, BREAKPOINTS as BP } from '../../constants';
import { HEADER_HEIGHT } from '../Header';

const ICON_SPACING = 1;
const MOBILE_MENU_WIDTH = '100%';
const DESKTOP_MENU_WIDTH = '30vw';


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
    left: -${MOBILE_MENU_WIDTH};
    top: ${+HEADER_HEIGHT.slice(0, 1) - 1}rem;
    height: 100vh;
    width: ${MOBILE_MENU_WIDTH};
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

  @media screen and (min-width: ${BP.MD}) {
    .link-container {
      left: -${DESKTOP_MENU_WIDTH};
      width: ${DESKTOP_MENU_WIDTH};
    }
  }
`;
