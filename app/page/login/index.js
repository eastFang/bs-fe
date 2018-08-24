import React from 'react'
import { Input, Button, PageCommon, Message, Form } from 'aliasComponent'
import { login } from 'aliasServer/user'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}

	_onSubmit(evt, data) {
		evt.preventDefault()
		login(data) 
			.then(() => {
				this.props.history.push('/')
			}).catch((error) => {
				Message.error(error)
			})
	}

	render() {
		return (
			<PageCommon.Passport passportBoxTitle='账号登录'>
				<Form onSubmit={this._onSubmit}>
					<Form.Field
						name='name'
						empty='请输入用户名'
						required>
						<Input placeholder='用户名' size='large'/>
					</Form.Field>
					<Form.Field
						name='password'
						empty='请输入密码'
						required>
						<Input placeholder='密码' size='large' type='password'/>
					</Form.Field>
					<Button type='primary' title='登录' style={{ width: '100%', height: '40px', lineHeight: '40px'}}/>
				</Form>
			</PageCommon.Passport>
		)
	}
}