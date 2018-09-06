import { flyUtil } from 'aliasUtil'

/**
 * 文章搜索
 * @param { 查询参数 } params 
 */
export const fetchArticleSearch = (params) => {
	return flyUtil({ url: '/api/search/article', params })
}

/**
 * 个人中心文章列表
 */
export const fetchUserArticlePaging = (params) => {
	return flyUtil({ url: '/api/article/paging', params })
}

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
 * 用户文章雷彪
 * @param { 查询参数 } params 
 */
export const userArticlePaging = (params) => {
	return flyUtil({ url: '/api/bloger/article/paging', params })
}
/**
 * 用户创建文章
 */
export const userCreateArticle = (params) => {
	return flyUtil({ url: '/api/bloger/article', params, method: 'post' })
}

/**
 * 用户编辑文章
 * @param {文章信息} params 
 */
export const userEditArticle = (params) => {
	return flyUtil({ url: '/api/bloger/article', params, method: 'put' })
}

/**
 * 用户删除文章
 * @param { 文章ID } id 
 */
export const userDeleteArticle = (id) => {
	return flyUtil({ url: `/api/bloger/article?id=${id}`, method: 'delete' })
}

/**
 * 点赞文章
 */
export const likeArticle = (params) => {
	return flyUtil({ url: '/api/like-log', params, method: 'post' })
}

/**
 * 取消点赞
 */
export const cancelLikeArticle = (params) => {
	return flyUtil({ url: '/api/like-log', params, method: 'delete' })
}