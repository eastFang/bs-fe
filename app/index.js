import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from 'aliasReducer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home, UI, Login, Register, UserCenter } from 'aliasPage'
import './index.scss'

const App = () => {
	return (
		<Provider store={createStore(Reducer)}>
			<Router>
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route path='/ui' component={UI}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
					<Route path='/userCenter' component={UserCenter}></Route>
				</Switch>
			</Router>
		</Provider>
	)
}

ReactDOM.render(<App />,document.getElementById('root'))