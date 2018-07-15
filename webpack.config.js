const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const apiMocker = require('webpack-api-mocker')




/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')




module.exports = {
	module: {
		rules: [{
			test: /\.(js|jsx|es6)$/,
			include: [path.resolve(__dirname, 'app')],
			exclude: /node_modules/,
			loader: 'babel-loader',
		}, {
			test: /\.(scss|css)$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader'
			}, {
				loader: 'sass-loader'
			}]
		}, {
			test: /\.(html)$/,
			loader: 'html-loader'
		}]
	},
	entry: './app/index',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public')
	},
	mode: 'development',
	devServer: {
		contentBase: './public',
		port: '20000',
		historyApiFallback: true,
		before: (app) => {
			apiMocker(app, path.resolve(__dirname, 'mock/api.js'))
		}
	},
	plugins: [new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'app/index.html'),
		filename: 'index.html'
	})],
	resolve: {
		alias: {
			aliasReducer: path.resolve(__dirname, 'app/reducer/'),
			aliasPage: path.resolve(__dirname, 'app/page/'),
			aliasComponent: path.resolve(__dirname, 'app/component/'),
		}
	}
}