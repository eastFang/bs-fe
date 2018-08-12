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
				<ul className='page-home'>
					<li>
						<Link to='/ui'>UI</Link><br />
					</li>
					<li>
						<Link to='/login'>Login</Link><br />
					</li>
					<li>
						<Link to='/register'>Register</Link><br />
					</li>
					<li>
						<p onClick={this._onFetch}>fetch</p>
						<code>{this.state.data}</code>
					</li>
				</ul>
			</React.Fragment>
		)
	}
}