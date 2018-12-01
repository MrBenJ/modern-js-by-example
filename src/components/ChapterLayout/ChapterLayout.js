// @flow
import React, { type Node } from 'react';
import { graphql } from 'gatsby';

type ChapterLayoutProps = {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string,
        html: any
      }
    }
  }
};

export default function ChapterLayout({ data }: ChapterLayoutProps): Node {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <div className="container">
      <div className="chapter-heading">
        <h1>{frontmatter.title}</h1>
      </div>
      <div
        className="chapter-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export const ChapterQuery = graphql`
  query($path: String!) {
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
