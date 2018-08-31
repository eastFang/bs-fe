/**
 * 白名单配置
 */
const withoutLoginUrlList = [
	/^\/$/,
	/\/login/,
	/\/register/,
	/\/search/,
	/\/article\/\d+/,
]

export default withoutLoginUrlList