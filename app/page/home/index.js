import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import fly from 'flyio'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null
		}
		this._onFetch = this._onFetch.bind(this)
	}

	_onFetch() {
		fly.get('/app/address/list')
			.then((res) => {
				this.setState({
					data: JSON.stringify(res.data.data)
				})
			})
	}

	render() {
		return (
			<React.Fragment>
				<Link to='/ui'>UI</Link><br />
				<Link to='/login'>Login</Link><br />
				<Link to='/register'>Register</Link><br />
				<p onClick={this._onFetch}>fetch</p>
				<code>{this.state.data}</code>
			</React.Fragment>
		)
	}
}