import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from 'aliasReducer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
	Home,
	Login,
	Register,
	UserCenter,
	Manage,
	Article,
} from 'aliasPage'
import UI from 'aliasUI'
import { PageCommonReturnTop, PageCommonVerifyUser } from 'aliasPageCommon'
import './index.scss'
// TODO 在这判断用户登录状态，白名单路径
// 从ceiling移出来判断用户登录状态的逻辑
const App = () => {
	return (
		<Provider store={createStore(Reducer)}>
			<Router>
				<div>
					<Switch>
						<Route exact path='/' component={Home}></Route>
						<Route path='/ui' component={UI}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/userCenter' component={UserCenter}></Route>
						<Route path='/manage/category' component={Manage.Category}></Route>
						<Route path='/manage/label' component={Manage.Label}></Route>
						<Route exact path='/manage/article' component={Manage.Article.List}></Route>
						<Route path='/article/add' component={Manage.Article.Add}></Route>
						<Route path='/manage/user' component={Manage.User}></Route>
						<Route exact path='/manage/userLoginLog' component={Manage.UserLoginLog}></Route>
						<Route path='/search' component={Article.List}></Route>
						<Route path='/article/:id' component={Article.Detail}></Route>
						<Route path='*' render={() => '404'}></Route>
					</Switch>
					<PageCommonReturnTop />
					<PageCommonVerifyUser />
				</div>
			</Router>
		</Provider>
	)
}

ReactDOM.render(<App />,document.getElementById('root'))