import Loadable from 'react-loadable'
import React from 'react'
import { Loading } from 'aliasPageCommon'

const MyLoadingComponent = ({ isLoading, error}) => {
	if (isLoading) {
		return <Loading />
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
const AsyncLogin = Loadable({
	loader: () => import(/* webpackChunkName: "login" */ './login'),
	loading: MyLoadingComponent
})
const AsyncRegister = Loadable({
	loader: () => import(/* webpackChunkName: "register" */ './register'),
	loading: MyLoadingComponent
})
const AsyncUserCenter = Loadable({
	loader: () => import(/* webpackChunkName: "userCenter" */ './userCenter/connect'),
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
const AsyncArticleList = Loadable({
	loader: () => import(/* webpackChunkName: "articleList" */ './artcile/list'),
	loading: MyLoadingComponent
})
const AsyncArticleDetail = Loadable({
	loader: () => import(/* webpackChunkName: "articleDetail" */ './artcile/detail'),
	loading: MyLoadingComponent
})
const AsyncUserLoginLog = Loadable({
	loader: () => import(/* webpackChunkName: "userLoginLog" */ './manage/logUserLogin'),
	loading: MyLoadingComponent
})

module.exports = {
	Home: AsyncHome,
	// UI: AsyncUI,
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
		UserLoginLog: AsyncUserLoginLog
	},
	Article: {
		List: AsyncArticleList,
		Detail: AsyncArticleDetail,
	},
}