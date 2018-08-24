import { flyUtil } from 'aliasUtil'

export const fetchArticlePaging = (params) => {
	return flyUtil({ url: '/api/admin/article/paging', params })
}

export const fetchCategoryPaging = () => {
	return flyUtil({ url: '/api/category/paging' })
}

export const createCategory = (category) => {
	return flyUtil({ url: '/api/category', params: category, method: 'post' })
}
