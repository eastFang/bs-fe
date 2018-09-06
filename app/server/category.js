import { flyUtil } from 'aliasUtil'

/**
 * 用户 - 类目列表
 */
export const fetchUserCategoryList = () => {
	return flyUtil({ url: '/api/bloger/category/find-by-user' })
}

/**
 * 管理端类目分页
 */
export const fetchCategoryPaging = () => {
	return flyUtil({ url: '/api/category/paging' })
}

/**
 * 用户 - 添加类目
 * @param { 分类信息 } category 
 */
export const userCreateCategory = (category) => {
	return flyUtil({ url: '/api/bloger/category', params: category, method: 'post' })
}

/**
 * 用户 - 编辑类目
 */
export const userEditCategory = ({ id, name }) => {
	return flyUtil({ url: `/api/bloger/category?id=${id}&name=${name}`, method: 'put' })
}