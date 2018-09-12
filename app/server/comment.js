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