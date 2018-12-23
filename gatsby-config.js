// For project environment variables, use these
// const dotenv = require('dotenv');
//
// dotenv.config({
//   oath: `.env.${process.env.GA_UA}`
// });

module.exports = {
  siteMetadata: {
    title: 'Modern Javascript by Example',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_UA,
        head: true,
        respectDNT: true
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/book`,
        name: 'markdown-pages'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs'
            // See https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
            // For additional options
          }
        ]
      }
    },

    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Modern JS by Example',
        short_name: 'Modern JS by Example',
        start_url: '/',
        background_color: '#2D93AD',
        theme_color: '#2D93AD',
        display: 'standalone',
        icon: 'src/images/js-logo.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
