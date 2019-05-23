const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		vendor: './node_modules/angular/angular',
		bundle: './app/js/main'
	},
	module: {
		rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
        }
      },
			{
				test: /\.woff2$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			}
		]
	},
	resolve: {
		modules: ['../../node_modules']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/index.html',
			minify: {
				removeScriptTypeAttributes: true
			}
		}),
		new CleanWebpackPlugin()
	],
  optimization: {
    splitChunks: {
      chunks: 'all',
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
    },
  }
};