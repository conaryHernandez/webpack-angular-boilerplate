const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	entry: {
		vendor: './node_modules/angular/angular',
		bundle: './app/js/main'
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename: '[name].js'
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
			},
			{
				test: /\.woff2$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}
		]
	},
	resolve: {
		modules: ['../../node_modules']
	},
	devtool: 'source-map',
	plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
	],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};