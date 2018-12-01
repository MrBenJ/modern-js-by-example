const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const chapterTemplate = path.resolve(__dirname, 'src/components/ChapterLayout/ChapterLayout.js');

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___chapter] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then( result => {
    if (result.errors) { return Promise.reject(result.errors); }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: chapterTemplate
      });
    });
  });
}