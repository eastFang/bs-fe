import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
		}
	}

	_onClick() {
		this.setState({
			visible: true
		})
	}

	render() {
		return (
			<React.Fragment>
				<h3>弹框</h3>
				<Button title='弹框' onClick={() => this._onClick()}/>
				<Modal visible={this.state.visible}>
					<div>1111</div>
					<div>222</div>
				</Modal>
			</React.Fragment>
		)
	}
}