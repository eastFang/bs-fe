import { flyUtil } from 'aliasUtil'

/**
 * 显示标签
 * @param { 标签ID } id 
 */
export const showVisible = (id) => {
	return flyUtil({ url: `/api/label/${id}/visible`, method: 'put' })
}

/**
 * 隐藏标签
 * @param { 标签ID } id 
 */
export const hideVisible = (id) => {
	return flyUtil({ url: `/api/label/${id}/invisible`, method: 'put' })
}

/**
 * 标签分页
 */
export const fetchLabelPaging = () => {
	return flyUtil({ url: '/api/label/paging' })
}

/**
 * 添加标签
 * @param { 标签信息 } label 
 */
export const createLabel = (label) => {
	return flyUtil({ url: '/api/label', params: label, method: 'post' })
}