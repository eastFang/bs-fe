import { flyUtil } from 'aliasUtil'

export const fetchUserProfile = () => {
	return flyUtil({ url: '/api/user/profile' })
}
