const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const devServer = require('webpack-dev-server');
const path = require('path');

module.exports = webpackMerge(baseConfig, {
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	devtool: 'eval',
	devServer: {
		port: 1337,
	}
})