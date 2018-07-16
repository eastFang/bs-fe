import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import fly from 'flyio'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}

	_onClick() {
		this.props.showTodo()
	}

	_onFetch() {
		fly.get('http://localhost:20000/app/address/list')
			.then((res) => {
				console.log(res.data)
			})
	}

	render() {
		return (
			<React.Fragment>
				<Link to='/ui'>UI</Link>
			</React.Fragment>
		)
	}
}