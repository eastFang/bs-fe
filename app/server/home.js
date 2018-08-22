import { flyUtil } from 'aliasUtil'

export const fetchArticlePaging = () => {
	return flyUtil({ url: '/api/article/paging' })
}

export const fetchPopularArticleList = () => {
	return flyUtil({ url: '/api/article/popular' })
}

export const fetchCategoryList = () => {
	return flyUtil({ url: '/api/category/list' })
}