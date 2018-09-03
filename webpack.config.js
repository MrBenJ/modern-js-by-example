// @flow
const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  devServer: {
    port: 3000,
    hot: true
  },
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    // new DotenvPlugin({
    //   path: '.env/development'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        include: [
          path.join(__dirname, 'src')
        ]
      },
      {
        test: /\.ya?ml$/,
        loaders: ['json-loader', 'yaml-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
        {
        test: /\.svg$/,
        use: ['file-loader']
      },
      {
        test: /\.flow$/,
        loader: 'ignore-loader'
      }
    ]
  }
};
