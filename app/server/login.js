import { flyUtil } from 'aliasUtil'

export const login = ({ name, password }) => {
	return flyUtil({
		url: `/api/user/login?name=${name}&password=${password}`,
		params: {},
		method: 'post'
	})
}