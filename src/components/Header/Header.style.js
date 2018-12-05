// @flow
import { COLORS as c } from '../../constants';

import { css } from 'emotion';

export const HEADER_HEIGHT = '5rem';

export default css`
  width: 100%;
  background-color: ${c.primary};
  position: fixed;
  z-index: 1;

  .container {
    margin: 0 auto;
    max-width: 960px;
    padding: 1.45rem 1.0875rem;
  }

  .heading {
    margin: 0;
  }

  .link {
    color: white;
    text-decoration: none;
  }

`;
