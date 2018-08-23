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

export const fetchLabelPaging = () => {
	return flyUtil({ url: '/api/label/paging' })
}

export const createLabel = (label) => {
	return flyUtil({ url: '/api/label', params: label, method: 'post' })
}

export const fetchUserPaging = (params) => {
	return flyUtil({ url: '/api/admin/user/paging', params })
}