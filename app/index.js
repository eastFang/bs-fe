import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from 'aliasReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Home, UI, Login } from 'aliasPage'
import './index.scss'

const AppRouter = () => {
	return (
		<Router>
			<div>
				<Route exact path='/' component={Home}></Route>
				<Route path='/ui' component={UI}></Route>
				<Route path='/login' component={Login}></Route>
			</div>
		</Router>
	)
}

const App = () => {
	return (
		<Provider store={createStore(Reducer)}>
			<AppRouter />
		</Provider>
	)
}

ReactDOM.render(<App />,document.getElementById('root'))