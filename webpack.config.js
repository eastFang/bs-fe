const path = require('path')
const apiMocker = require('webpack-api-mocker')
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
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			analyzerHost: '127.0.0.1',
			analyzerPort: '20001',
			reportFilename: 'report.html',
			openAnalyzer: true
		}),
	],
}