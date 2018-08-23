import { flyUtil } from 'aliasUtil'

export const fetchArticleSearch = (params) => {
	return flyUtil({ url: '/api/search/article', params })
}