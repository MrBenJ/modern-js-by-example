// supress@flow
import { css } from '@emotion/core';

import { COLORS as c } from '../../constants';
import { HEADER_HEIGHT } from '../Header';

export default css`
  background-color: ${c.light};

  .container-with-header {
    padding-top: ${HEADER_HEIGHT};
  }

`;
