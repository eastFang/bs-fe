import React from 'react'
import { Spin } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isFetching: true
		}
	}

	render() {
		return (
			<React.Fragment>
				<h3>菊花</h3>
				<Spin isFetching={this.state.isFetching}>
					<div style={{ width: '100px', height: '100px' }} onClick={() => alert(333)}>菊花</div>
				</Spin>
				<a onClick={() => this.setState({ spin: !this.state.isFetching })}>切换状态</a>
			</React.Fragment>
		)
	}
}