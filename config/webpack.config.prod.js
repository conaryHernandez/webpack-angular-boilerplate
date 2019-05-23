const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json'
    })
  ],
  optimization: {
    minimizer: [
     new TerserPlugin({
        cache: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true,
          }
        }
      })
    ],
  }
})