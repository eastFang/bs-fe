const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
	entry: {
		app: './app/index',
		vendor: ['react', 'flyio', 'react-dom', 'react-router-dom']
	},
	output: {
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'app/index.html'),
			filename: 'index.html'
		}),
	],
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