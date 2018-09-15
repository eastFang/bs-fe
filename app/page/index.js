import Loadable from 'react-loadable'
import React from 'react'
import { Loading } from 'aliasPageCommon'

const MyLoadingComponent = ({ isLoading, error}) => {
	if (isLoading) {
		return <Loading />
	} else if (error) {
		console.log(error)
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
const AsyncManageArticle = Loadable({
	loader: () => import(/* webpackChunkName: "manageArticle" */ './manage/article'),
	loading: MyLoadingComponent
})
const AsyncUserList = Loadable({
	loader: () => import(/* webpackChunkName: "manageUser" */ './manage/user'),
	loading: MyLoadingComponent
})
const AsyncArticleList = Loadable({
	loader: () => import(/* webpackChunkName: "articleList" */ './article/list'),
	loading: MyLoadingComponent
})
const AsyncArticleAdd = Loadable({
	loader: () => import(/* webpackChunkName: "articleAdd" */ './article/add'),
	loading: MyLoadingComponent
})
const AsyncArticleDetail = Loadable({
	loader: () => import(/* webpackChunkName: "articleDetail" */ './article/detail'),
	loading: MyLoadingComponent
})
const AsyncUserLoginLog = Loadable({
	loader: () => import(/* webpackChunkName: "userLoginLog" */ './manage/logUserLogin'),
	loading: MyLoadingComponent
})
const AsyncFriendLinkList = Loadable({
	loader: () => import(/* webpackChunkName: "friendLink" */ './manage/friendLink'),
	loading: MyLoadingComponent
})
const AsyncManageComment = Loadable({
	loader: () => import(/* webpackChunkName: "manageComment" */ './manage/comment'),
	loading: MyLoadingComponent
})
const AsyncManageCommentDetail = Loadable({
	loader: () => import(/* webpackChunkName: "manageCommentDetail" */ './manage/comment/detail'),
	loading: MyLoadingComponent
})

module.exports = {
	Home: AsyncHome,
	Login: AsyncLogin,
	Register: AsyncRegister,
	UserCenter: AsyncUserCenter,
	Manage: {
		Category: AsyncManageCateogry,
		Article: {
			List: AsyncManageArticle,
		},
		User: AsyncUserList,
		UserLoginLog: AsyncUserLoginLog,
		Comment: {
			List: AsyncManageComment,
			Detail: AsyncManageCommentDetail,
		}
	},
	Article: {
		List: AsyncArticleList,
		Detail: AsyncArticleDetail,
		Add: AsyncArticleAdd,
	},
	FriendLink: {
		List: AsyncFriendLinkList
	},
}