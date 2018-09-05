import { flyUtil } from 'aliasUtil'

/**
 * 运营创建友情链接
 */
export const adminCreateFriendLink = (params) => {
	return flyUtil({ url: '/api/admin/friend-link', method: 'post', params })
}

/**
 * 运营更新友情链接
 */
export const adminUpdateFriendLink = (params) => {
	return flyUtil({ url: '/api/admin/friend-link', method: 'put', params })
}

/**
 * 友情链接分页
 */
export const fetchAdminFriendLinkList = (params) => {
	return flyUtil({ url: '/api/admin/friend-link/paging', params })
}

/**
 * 前台展示友情链接列表
 */
export const fetchFrontFriendLinkList = () => {
	return flyUtil({ url: '/api/friend-link/visible' })
}