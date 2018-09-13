import { flyUtil } from 'aliasUtil'

const TYPE = 1
/**
 * 用户评论
 */
export const userComment = (params) => {
	return flyUtil({ url: '/api/bloger/comment', params, method: 'post' })
}

/**
 * 文章详情评论不分页列表
 * @param { 文章ID } aimId 
 */
export const articleCommentList = (aimId) => {
	return flyUtil({ url: `/api/comment/list?aimId=${aimId}&type=${TYPE}` })
}

/**
 * 运营后台评论列表
 * @param { obj } params 查询条件
 */
export const adminCommentList = (params) => {
	return flyUtil({ url: '/api/admin/comment/paging', params })
}

/**
 * 运营后台删除评价
 * @param { number } id 评价ID
 */
export const adminDelComment = (id) => {
	return flyUtil({ url: `/api/admin/comment/${id}/delete`, method: 'put' })
}

/**
 * 运营后台查看评价详情
 * @param { number } id 评价ID
 */
export const adminCommentDetail = (id) => {
	return flyUtil({ url: `/api/admin/comment/${id}/detail` })
}