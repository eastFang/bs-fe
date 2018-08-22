import { flyUtil } from 'aliasUtil'

export const fetchArticleList = () => {
	return flyUtil({ url: '/api/admin/article/paging', params: { pageNo: 1, pageSize: 10} })
}

export const fetchCategoryList = () => {
	return flyUtil({ url: '/api/category/paging' })
}

export const createCategory = (category) => {
	return flyUtil({ url: '/api/category', params: category, method: 'post' })
}

export const fetchLabelList = () => {
	return flyUtil({ url: '/api/label/paging' })
}

export const createLabel = (label) => {
	return flyUtil({ url: '/api/label', params: label, method: 'post' })
}

export const fetchUserList = () => {
	return flyUtil({ url: '/api/admin/user/paging' })
}