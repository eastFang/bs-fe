import { flyUtil } from 'aliasUtil'

/**
 * 用户登录IP日志
 * @param { 查询参数 } params 
 */
export const fetchUserLoginLogPaging = (params) => {
	return flyUtil({ url: '/api/admin/user/login-log/paging', params })
}

export const fetchSeeLogs = () => {
	return flyUtil({ url: '/api/admin/see-log/paging' })
}