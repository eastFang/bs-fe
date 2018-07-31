import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from 'aliasReducer'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Home, UI, Login, Register } from 'aliasPage'
import './index.scss'

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home}></Route>
				<Route path='/ui' component={UI}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/register' component={Register}></Route>
			</Switch>
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