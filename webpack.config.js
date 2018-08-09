const path = require('path')
const apiMocker = require('webpack-api-mocker')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	mode: 'development',
	devServer: {
		contentBase: './public',
		port: '20000',
		hot: false,
		historyApiFallback: true,
		before: (app) => {
			apiMocker(app, path.resolve(__dirname, 'mock/api.js'))
		},
		proxy: {
			'/api/*': {
				target: 'http://dev-api.yingchengpeng.com',
				changeOrigin: true,
			}
		},
		disableHostCheck: true
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
		}),
	],
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
	entry: {
		app: './app/index',
		vendor: ['react', 'flyio', 'react-dom', 'react-router-dom']
	},
	output: {
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'vendor',
					chunks: 'all',
					minChunks: 2,
				}
			}
		}
	},
	resolve: {
		alias: {
			aliasReducer: path.resolve(__dirname, 'app/reducer/'),
			aliasPage: path.resolve(__dirname, 'app/page/'),
			aliasComponent: path.resolve(__dirname, 'app/component/'),
			aliasUtil: path.resolve(__dirname, 'app/util/')
		}
	}
}