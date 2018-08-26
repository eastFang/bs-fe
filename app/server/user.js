import { flyUtil } from 'aliasUtil'

/**
 * 获取当前用户个人资料
 */
export const fetchCurrentUserProfile = () => {
	return flyUtil({ url: '/api/user/profile' })
}

/**
 * 更新用户信息
 * @param {用户信息} params 
 */
export const updateUserProfile = (params) => {
	return flyUtil({ url: '/api/user/profile', method: 'post', params })
}

/**
 * 用户注册
 * @param { name: 用户名, capthca: 图片验证码, password: 密码 } 
 */
export const register = ({ name, captcha, password }) => {
	return flyUtil({
		url: '/api/user/register',
		params: { name, captcha, password },
		method: 'post'
	})
}

/**
 * 用户登录
 * @param { name: 用户名, password: 密码 } param0 
 */
export const login = ({ name, password }) => {
	return flyUtil({
		url: `/api/user/login?name=${name}&password=${password}`,
		params: {},
		method: 'post'
	})
}

/**
 * 获取用户详情
 * @param { 用户id } id 
 */
export const fetchUserDetail = (id) => {
	return flyUtil({ url: `/api/admin/user/${id}/detail` })
}

/**
 * 管理端 获取所有用户
 * @param { 查询参数 } params 
 */
export const fetchUserPaging = (params) => {
	return flyUtil({ url: '/api/admin/user/paging', params })
}