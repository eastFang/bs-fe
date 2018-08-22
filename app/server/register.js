import { flyUtil } from 'aliasUtil'

export const register = ({ name, captcha, password }) => {
	return flyUtil({
		url: '/api/user/register',
		params: { name, captcha, password },
		method: 'post'
	})
}
