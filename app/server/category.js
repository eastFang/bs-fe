import { flyUtil } from 'aliasUtil'

/**
 * 前台展示 - 类目列表
 */
export const fetchCategoryList = () => {
	return flyUtil({ url: '/api/category/list' })
}

/**
 * 管理端类目分页
 */
export const fetchCategoryPaging = () => {
	return flyUtil({ url: '/api/category/paging' })
}

/**
 * 添加类目
 * @param { 分类信息 } category 
 */
export const createCategory = (category) => {
	return flyUtil({ url: '/api/category', params: category, method: 'post' })
}