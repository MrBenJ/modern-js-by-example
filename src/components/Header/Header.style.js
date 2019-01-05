// supress@flow
import { css } from '@emotion/core';
import { COLORS as c, BREAKPOINTS as BP } from '../../constants';



export const HEADER_HEIGHT = '5rem';

export default css`
  width: 100%;
  background-color: ${c.primary};
  position: fixed;
  z-index: 1;

  .container {
    margin: 0 auto;
    padding: 1.45rem 1.0875rem;
  }

  .heading {
    margin: 0;
    margin-left: 3rem;
    font-size: 1.1rem;
  }

  .link {
    color: white;
    text-decoration: none;
  }

  @media screen and (min-width:${BP.SM}) {
    .heading {
      font-size: 2rem;
    }
  }

  @media screen and (min-width:${BP.MD}) {
    .heading {
      margin-left: 2rem;
    }
  }

  /*@media screen and (min-width:${+BP.LG.slice(0, 2) + 30}px) {
    .heading {
      margin-left: 2rem;
     }
  }*/

`;
