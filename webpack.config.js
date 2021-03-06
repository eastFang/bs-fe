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
		inline: false,
		historyApiFallback: true,
		before: (app) => {
			apiMocker(app, path.resolve(__dirname, 'mock/api.js'))
		},
		proxy: {
			'/api/*': {
				target: 'http://blog-api.yingchengpeng.com',
				changeOrigin: true,
			}
		},
		disableHostCheck: true,
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
		rules:
		[
			{
				test: /\.(js|jsx|es6)$/,
				include: [path.resolve(__dirname, 'app')],
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(scss|css)$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}]
			},
			{
				test: /\.(html)$/,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'file-loader'
			}
		]
	},
	entry: {
		app: './app/index',
		vendor: ['react', 'flyio', 'react-dom', 'react-router-dom', 'lodash']
	},
	output: {
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public'),
		publicPath: '/', // 配合react-router 二级以上路由可以访问到静态资源
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
			aliasUtil: path.resolve(__dirname, 'app/util/'),
			aliasServer: path.resolve(__dirname, 'app/server/'),
			aliasImage: path.resolve(__dirname, 'app/image/'),
			aliasPageCommon: path.resolve(__dirname, 'app/pageCommon/'),
			aliasUI: path.resolve(__dirname, 'app/ui'),
		}
	}
}