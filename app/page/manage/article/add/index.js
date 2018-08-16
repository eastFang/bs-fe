import React from 'react'
import ManageCommonPage from '../../common/page'
import { Editor, Button, Form, Input, Space } from 'aliasComponent'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}
  
	_onSubmit(evt, data) {
		evt.preventDefault()
	}

	render() {
		return (
			<ManageCommonPage>
				<Form onSubmit={this._onSubmit}>
					<Form.Field label='标题' name='title' empty='文章标题不得为空' required>
						<Input placeholder='文章标题' />
					</Form.Field>
					<Space height={16}/>
					<Form.Field label='简介' name='synopsis' empty='文章简介不得为空' required>
						<Input placeholder='文章简介' />
					</Form.Field>
					<Space height={16}/>
					<Editor ref='editor'/>
					<Button title='提交' type='primary' />
				</Form>
			</ManageCommonPage>
		)
	}
}