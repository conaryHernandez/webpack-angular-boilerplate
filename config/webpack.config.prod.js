const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
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
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
	],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  }
})