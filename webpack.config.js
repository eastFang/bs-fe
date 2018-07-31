const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const apiMocker = require('webpack-api-mocker')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
		hot: false,
		historyApiFallback: true,
		before: (app) => {
			apiMocker(app, path.resolve(__dirname, 'mock/api.js'))
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'app/index.html'),
			filename: 'index.html'
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: '20001',
			reportFilename: 'report.html',
			openAnalyzer: true
		})
	],
	resolve: {
		alias: {
			aliasReducer: path.resolve(__dirname, 'app/reducer/'),
			aliasPage: path.resolve(__dirname, 'app/page/'),
			aliasComponent: path.resolve(__dirname, 'app/component/'),
			aliasUtil: path.resolve(__dirname, 'app/util/')
		}
	}
}