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
import { ReturnTop, VerifyUser } from 'aliasPageCommon'
import './index.scss'

const App = () => {
	return (
		<Provider store={createStore(Reducer)}>
			<Router>
				<div>
					<Switch>
						<Route exact path='/' component={VerifyUser(Home)}></Route>
						<Route path='/ui' component={UI}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/userCenter' component={VerifyUser(UserCenter)}></Route>
						<Route path='/manage/category' component={VerifyUser(Manage.Category)}></Route>
						<Route path='/manage/label' component={VerifyUser(Manage.Label)}></Route>
						<Route exact path='/manage/article' component={VerifyUser(Manage.Article.List)}></Route>
						<Route path='/article/add' component={VerifyUser(Manage.Article.Add)}></Route>
						<Route path='/manage/user' component={VerifyUser(Manage.User)}></Route>
						<Route exact path='/manage/userLoginLog' component={VerifyUser(Manage.UserLoginLog)}></Route>
						<Route path='/search' component={VerifyUser(Article.List)}></Route>
						<Route path='/article/:id' component={VerifyUser(Article.Detail)}></Route>
						<Route path='*' render={() => '404'}></Route>
					</Switch>
					<ReturnTop />
				</div>
			</Router>
		</Provider>
	)
}

ReactDOM.render(<App />,document.getElementById('root'))