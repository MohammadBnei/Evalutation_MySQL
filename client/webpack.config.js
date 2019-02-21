'use strict';

var HtmlWebPackPlugin = require('html-webpack-plugin')
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require('path');
// var Fiber = require('fibers');

var devMode = process.env.NODE_ENV !== 'production'

var htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

var miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
  chunkFilename: '[id].css'
})

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            {loader :'babel-loader'},
            {loader :'eslint-loader',
              options: {
                failOnError: true,
              }
            }
          ]
      },

      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          // fallback to style-loader in development
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
    ]
  },
  resolve: {
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js'
    }
  },
  devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    htmlWebpackPlugin,
    miniCssExtractPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    })
  ],
  node: {
   fs: "empty"
  }
}