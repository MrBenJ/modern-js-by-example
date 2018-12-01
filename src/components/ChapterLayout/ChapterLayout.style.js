// @flow
import { css } from 'emotion';
import { COLORS as c } from '../../constants';

/*
  All chapter page markdown styling
 */
export default css`
  background-color: ${c.light};

  .chapter-heading {
    padding-top: 1.5rem;
  }

  pre {
    background-color: ${c.secondary};
  }
  h2 code {
    font-size: 1.4rem;
  }

  h3 code {
    font-size: 1.2rem;
  }



`;
