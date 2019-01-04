// @flow
import React, { type Node } from 'react';
import { graphql } from 'gatsby';

import Header from '../Header';
import Menu from '../Menu';
import style from './ChapterLayout.style';

type ChapterLayoutProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    },
    markdownRemark: {
      frontmatter: {
        title: string
      },
      html: string
    }
  }
};

export default function ChapterLayout({ data }: ChapterLayoutProps): Node {
  const { markdownRemark, site } = data;
  const { frontmatter, html } = markdownRemark;
  const { siteMetadata: { title } } = site;
  return (
    <div css={style}>
      <Menu />
      <Header siteTitle={title} />
      <div className="container container-with-header">
        <div className="chapter-heading">
          <h1>{frontmatter.title}</h1>
        </div>

        <div
          className="chapter-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export const ChapterQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        chapter
      }
    }
  }
`;
