import { flyUtil } from 'aliasUtil'

/**
 * 文章搜索
 * @param { 查询参数 } params 
 */
export const fetchArticleSearch = (params) => {
	return flyUtil({ url: '/api/search/article', params })
}

// /**
//  * 文章列表
//  */
// export const fetchArticlePaging = () => {
// 	return flyUtil({ url: '/api/article/paging' })
// }

/**
 * popular文章列表
 */
export const fetchPopularArticleList = () => {
	return flyUtil({ url: '/api/article/popular' })
}

/**
 * 文章详情
 * @param { 文章ID } id 
 */
export const fetchArticleDetail = (id) => {
	return flyUtil({ url: `/api/article/${id}/detail` })
}

/**
 * 管理端文章分页
 * @param { 查询参数 } params 
 */
export const fetchAdminArticlePaging = (params) => {
	return flyUtil({ url: '/api/admin/article/paging', params })
}

/**
 * 创建文章
 */
export const createArticle = (params) => {
	return flyUtil({ url: '/api/admin/article', params, method: 'post' })
}