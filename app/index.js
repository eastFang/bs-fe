import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './page/home'
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

ReactDOM.render(<AppRouter />,document.getElementById('root'))