// @flow
import { css } from '@emotion/core';
import { COLORS as c } from '../../constants';
import { HEADER_HEIGHT } from '../Header';
/*
  All chapter page markdown styling
 */
export default css`
  background-color: ${c.light};

  .container-with-header {
    padding-top: ${HEADER_HEIGHT};
  }

  .chapter-heading {
    padding-top: 1.5rem;
  }

  h2 code {
    font-size: 1.4rem;
  }

  h3 code {
    font-size: 1.2rem;
  }



`;
