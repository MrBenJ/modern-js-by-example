// @flow
import React, { type Node } from 'react';

import style from './index.style';
import Layout from '../components/Layout';

const IndexPage = (): Node => {
  return (
    <Layout>
      <div className={style}>
        { /* BOOK IMAGE LOGO HERE */}
        <img src="https://img.shields.io/badge/dynamic/json.svg?label=GitHub+Stars&url=https%3A%2F%2Fapi.github.com%2Frepos%2Fmrbenj%2Fmodern-js-by-example&query=stargazers_count&colorB=green"/>

        <h2>A book by Ben Junya</h2>
        <p>
          Modern Javascript by Example is a free and open-source book created by me,
          <a href="https://www.github.com/MrBenJ" target="_blank" rel="noopener noreferrer"> Ben Junya </a>
        </p>
        <p>
          Javascript moves fast, really really fast. By the time you take the first sip of coffee this morning, Javascript has already smashed the accelerator pedal down so far, it went through the chassis and Pluto has been colonized by Node version 14. Every step you take, a new patched verion of Node is released, and four new frameworks have been invented. No pressure to keep up, right?
        </p>
        <p>
          All joking aside, the language that was once seen as a weird-ish toy language is used to build beautiful user interfaces, do automated tasks, and deliver web content at blazing fast speeds. Javascript is here to stay, and the evolution of the language and its quirky properties will continue as time goes on.
        </p>
        <h2>About the book</h2>
        <p>
          Modern Javascript by Example includes:
        </p>
        <ul>
          <li>Tons of code examples that explain themselves</li>
          <li>Focus on high quality examples and pragmatic knowledge</li>
          <li>Absolutely terrible humor</li>
        </ul>
        <p>
          This book is available <strong>offline</strong> - so save it to your <strong>bookmarks</strong> for offline viewing :).
        </p>
      </div>
      <h2>Contributing</h2>
      <p>
        Modern Javascript by Example is a free and open-source book. If you want to support the creator, I am accepting donations in these ways
      </p>
      <ul>
        <li>Paypal - <a className="link-donate" href='https://paypal.me/benjunya'target="_blank" rel="noopener noreferrer">Link here</a></li>
        <li>Bitcoin (BTC) - Address: 15MiGcJXVkyYbVcA4NmkzawAemhmWYu5Yv</li>
        <li>Ethereum (ETH) - Address: 0x0d56331491f161d812a9c1699a8e5c8c1a243292</li>
        <li>Ravencoin (RVN) - Address: RK9AChQdph96HeJsVihasrhjWCjabFPojN</li>
      </ul>
      <h2>Book Contributors</h2>
      <p>
        This book would not be possible without the help of these wonderful people who contributed to the github repository
      </p>
    </Layout>

  );
}

export default IndexPage;
