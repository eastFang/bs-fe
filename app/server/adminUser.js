import { flyUtil } from 'aliasUtil'

export const fetchUserDetail = (id) => {
	return flyUtil({ url: `/api/admin/user/${id}/detail` })
}

export const fetchUserPaging = (params) => {
	return flyUtil({ url: '/api/admin/user/paging', params })
}