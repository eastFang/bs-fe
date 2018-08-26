import { flyUtil } from 'aliasUtil'

/**
 * 文章搜索
 * @param { 查询参数 } params 
 */
export const upload = (params) => {
	return flyUtil({ url: '/api/file/upload', params, method: 'post' })
}