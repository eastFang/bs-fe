import React from 'react'
import { Modal, Button } from 'aliasComponent'

export default class extends React.Component {

	_onClick() {
		this.refs.modal.show()
	}

	render() {
		return (
			<React.Fragment>
				<h3>弹框</h3>
				<Button title='弹框' onClick={() => this._onClick()}/>
				<Modal ref='modal' />
			</React.Fragment>
		)
	}
}