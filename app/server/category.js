import { flyUtil } from 'aliasUtil'

export const fetchCategoryList = () => {
	return flyUtil({ url: '/api/category/list' })
}