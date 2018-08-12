import Loadable from 'react-loadable'
import React from 'react'

const MyLoadingComponent = ({ isLoading, error}) => {
	if (isLoading) {
		return <div>Loading</div>
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
const AsyncEntrance = Loadable({
	loader: () => import(/* webpackChunkName: "entrance" */ './entrance/connect'),
	loading: MyLoadingComponent
})
const AsyncUserCenter = Loadable({
	loader: () => import(/* webpackChunkName: "userCenter" */ './userCenter'),
	loading: MyLoadingComponent
})

module.exports = {
	Home: AsyncHome,
	UI: AsyncUI,
	Login: AsyncLogin,
	Register: AsyncRegister,
	Entrance: AsyncEntrance,
	UserCenter: AsyncUserCenter,
}