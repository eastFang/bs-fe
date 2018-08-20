import React from 'react'
import { Input, Button, Space, PageCommon, Message, Form } from 'aliasComponent'
import { flyUtil } from 'aliasUtil'
import './index.scss'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this._onRefreshCaptcha = this._onRefreshCaptcha.bind(this)
		this._onSubmit = this._onSubmit.bind(this)
		this.state = {
			timestamp: Date.now()
		}
	}

	_onSubmit(evt, data) {
		evt.preventDefault()
		const { name, captcha, password } = data
		flyUtil({
			url: '/api/user/register',
			params: { name, captcha, password },
			method: 'post'
		}).then(() => {
			this.props.history.push('/')
		}).catch((error) => {
			Message.error(error.message)
		})
	}

	_onRefreshCaptcha() {
		this.setState({
			timestamp: Date.now()
		})
	}

	render() {
		return (
			<PageCommon.Passport passportBoxTitle='账号注册'>
				<Form onSubmit={this._onSubmit}>
					<Form.Field name='name' error='请输入用户名' required>
						<Input size='large' placeholder='用户名'/>
					</Form.Field>
					<Form.Field className='captcha-wrap' name='captcha' error='请输入验证码' required>
						<Input size='large' placeholder='验证码'/>
						<img src={`/api/user/captcha?_${this.state.timestamp}`} onClick={this._onRefreshCaptcha}/>
					</Form.Field>
					<Form.Field name='password' error='请输入密码' required>
						<Input size='large'placeholder='密码' type='password'/>
					</Form.Field>
					<Button type='primary' title='立即注册' style={{ width: '100%', height: '48px', lineHeight: '48px'}}/>
				</Form>
			</PageCommon.Passport>
		)
	}
}