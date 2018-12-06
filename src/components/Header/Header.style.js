// @flow
import { COLORS as c } from '../../constants';

import { css } from 'emotion';

export default css`
  background-color: ${c.primary};


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