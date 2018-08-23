import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from 'aliasReducer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
	Home,
	UI,
	Login,
	Register,
	UserCenter,
	Manage,
	Article,
} from 'aliasPage'
import { PageCommon } from 'aliasComponent'
import './index.scss'

const App = () => {
	return (
		<Provider store={createStore(Reducer)}>
			<Router>
				<PageCommon.ReturnTop>
					<Switch>
						<Route exact path='/' component={Home}></Route>
						<Route path='/ui' component={UI}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route path='/userCenter' component={UserCenter}></Route>
						<Route path='/category' component={Manage.Category}></Route>
						<Route path='/label' component={Manage.Label}></Route>
						<Route exact path='/article' component={Manage.Article.List}></Route>
						<Route path='/addArticle' component={Manage.Article.Add}></Route>
						<Route path='/user' component={Manage.User}></Route>
						<Route path='/squareArticle' component={Article.List}></Route>
						<Route path='/article/:id' component={Article.Detail}></Route>
					</Switch>
				</PageCommon.ReturnTop>
			</Router>
		</Provider>
	)
}

ReactDOM.render(<App />,document.getElementById('root'))