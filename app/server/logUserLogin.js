import { flyUtil } from 'aliasUtil'

export const fetchUserLoginLogPaging = (params) => {
	return flyUtil({ url: '/api/admin/user/login-log/paging', params })
}