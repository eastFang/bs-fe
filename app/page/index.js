import Loadable from 'react-loadable'
import React from 'react'
import { PageCommon } from 'aliasComponent'

const MyLoadingComponent = ({ isLoading, error}) => {
	if (isLoading) {
		return <PageCommon.Loading />
	} else if (error) {
		return <div>sorry</div>
	} else {
		return null
	}
}

const AsyncHome = Loadable({
	loader: () => import(/* webpackChunkName: "home" */ './home'),
	loading: MyLoadingComponent
})
const AsyncUI = Loadable({
	loader: () => import(/* webpackChunkName: "ui" */ './ui'),
	loading: MyLoadingComponent
})
const AsyncLogin = Loadable({
	loader: () => import(/* webpackChunkName: "login" */ './login'),
	loading: MyLoadingComponent
})
const AsyncRegister = Loadable({
	loader: () => import(/* webpackChunkName: "register" */ './register'),
	loading: MyLoadingComponent
})
const AsyncUserCenter = Loadable({
	loader: () => import(/* webpackChunkName: "userCenter" */ './userCenter'),
	loading: MyLoadingComponent
})
const AsyncManageCateogry = Loadable({
	loader: () => import(/* webpackChunkName: "manageCategory" */ './manage/category'),
	loading: MyLoadingComponent
})
const AsyncManageLabel = Loadable({
	loader: () =>  import(/* webpackChunkName: "manageLabel" */ './manage/label'),
	loading: MyLoadingComponent
})
const AsyncManageArticle = Loadable({
	loader: () => import(/* webpackChunkName: "manageArticle" */ './manage/article'),
	loading: MyLoadingComponent
})
const AsyncManageArticleAdd = Loadable({
	loader: () => import(/* webpackChunkName: "manageArticleAdd" */ './manage/article/add'),
	loading: MyLoadingComponent
})
const AsyncUserList = Loadable({
	loader: () => import(/* webpackChunkName: "manageUser" */ './manage/user'),
	loading: MyLoadingComponent
})

module.exports = {
	Home: AsyncHome,
	UI: AsyncUI,
	Login: AsyncLogin,
	Register: AsyncRegister,
	UserCenter: AsyncUserCenter,
	Manage: {
		Category: AsyncManageCateogry,
		Label: AsyncManageLabel,
		Article: {
			List: AsyncManageArticle,
			Add: AsyncManageArticleAdd,
		},
		User: AsyncUserList,
	},
}