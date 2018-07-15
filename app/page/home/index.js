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
			<div>
				<p>首页{this.props.todo}</p>
				<button onClick={this._onClick.bind(this)}>TODO+2</button>
				<button onClick={this._onFetch.bind(this)}>获取国家列表</button>
				<Link to='/ui'>UI</Link>
			</div>
		)
	}
}