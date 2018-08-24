import { flyUtil } from 'aliasUtil'

export const showVisible = (id) => {
	return flyUtil({ url: `/api/label/${id}/visible`, method: 'put' })
}

export const hideVisible = (id) => {
	return flyUtil({ url: `/api/label/${id}/invisible`, method: 'put' })
}

export const fetchLabelPaging = () => {
	return flyUtil({ url: '/api/label/paging' })
}

export const createLabel = (label) => {
	return flyUtil({ url: '/api/label', params: label, method: 'post' })
}