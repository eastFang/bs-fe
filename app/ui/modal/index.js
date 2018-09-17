import React from 'react'
import { Modal, Button } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
	}

	onConfirmModal() {
		Modal.confirm({
			title: '确认弹框',
			content: '确认操作'
		}, () => {
			alert('确认回调')
		})
	}

	render() {
		return (
			<React.Fragment>
				<h3>弹框</h3>
				<Button title='弹框1' onClick={() => this.refs.modal1.show()}/>
				<Button title='弹框2' onClick={() => this.refs.modal2.show()}/>
				<Button title='确认弹框' onClick={() => this.onConfirmModal()}/>
				<Button title='成功提示' onClick={() => Modal.success('操作成功')}/>
				<Button title='失败提示' onClick={() => Modal.error('操作失败')}/>
				<Modal ref='modal1' title='弹框1'
					onOK={() => alert(111111)}
				>
					<p>内容1.............</p>
				</Modal>
				<Modal ref='modal2' title='弹框2'
					onOK={() => alert(222222)}
				>
					<p>内容2.............</p>
				</Modal>
			</React.Fragment>
		)
	}
}