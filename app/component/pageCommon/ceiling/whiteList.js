/**
 * 白名单配置
 */
const withoutLoginUrlList = [
	/^\/$/,
	/\/login/,
	/\/register/,
	/\/squareArticle/,
	/\/article\/\d+/,
]

export default withoutLoginUrlList