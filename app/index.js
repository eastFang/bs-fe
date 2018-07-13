import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from 'reducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './page/home/connect'
import Test from './page/test'

const AppRouter = () => {
	return (
		<Router>
			<div>
				<Route exact path='/' component={Home}></Route>
				<Route exact path='/test' component={Test}></Route>
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