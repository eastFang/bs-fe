import React from 'react'
import { Modal, Button } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<React.Fragment>
				<h3>弹框</h3>
				<Button title='弹框1' onClick={() => this.refs.modal1.show()}/>
				<Button title='弹框2' onClick={() => this.refs.modal2.show()}/>
				<Modal ref='modal1'
					onOK={() => alert(111111)}
				>
					<p>内容1.............</p>
				</Modal>
				<Modal ref='modal2'
					onOK={() => alert(222222)}
				>
					<p>内容2.............</p>
				</Modal>
			</React.Fragment>
		)
	}
}