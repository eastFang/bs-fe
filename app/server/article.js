import { flyUtil } from 'aliasUtil'

export const fetchArticleSearch = (params) => {
	return flyUtil({ url: '/api/search/article', params })
}

export const fetchArticlePaging = () => {
	return flyUtil({ url: '/api/article/paging' })
}

export const fetchPopularArticleList = () => {
	return flyUtil({ url: '/api/article/popular' })
}

export const fetchArticleDetail = (id) => {
	return flyUtil({ url: `/api/article/${id}/detail` })
}