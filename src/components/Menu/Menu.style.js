// @flow
import { css } from 'emotion';

import { COLORS as c } from '../../constants';

const SPACING = '8rem';
const OPEN_SPACING = '8rem';
export default css`
  position: fixed;
  padding: .5rem;
  transition: all .4s ease-in-out;
  left: -${SPACING};
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${c.primary};
  border-radius: 3rem;

  &:hover {
    left: ${OPEN_SPACING};
  }

  .link-container, .menu-arrow {
    display: inline-block;
  }

  .menu-arrow {
    padding: ${SPACING} 0;
    margin-left: 3rem;
    font-size: 1.5rem;
    vertical-align: top;
    color: white;
  }
`;
