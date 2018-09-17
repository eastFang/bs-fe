import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Message, Form } from 'aliasComponent'
import { Passport } from 'aliasPageCommon'
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
				// TODO: 优化
				// 登录成功后Wrap无法重新调起获取用户登录信息
				this.props.history.go(-1)
			}).catch((error) => {
				Message.error(error)
			})
	}

	render() {
		return (
			<Passport passportBoxTitle='账号登录'>
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
					<div className='link-other'>
						<Link className='pull-right' to='/register'>立即注册</Link>
					</div>
					<Button type='primary' title='登录' style={{ width: '100%', height: '40px', lineHeight: '40px'}}/>
				</Form>
			</Passport>
		)
	}
}