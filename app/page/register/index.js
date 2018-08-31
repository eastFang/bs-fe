import React from 'react'
import { Input, Button, Message, Form } from 'aliasComponent'
import { PageCommonPassport } from 'aliasPageCommon'
import { register } from 'aliasServer/user'
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
		register(data)
			.then(() => {
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
			<PageCommonPassport passportBoxTitle='账号注册'>
				<Form onSubmit={this._onSubmit}>
					<Form.Field name='name' empty='请输入用户名' required>
						<Input size='large' placeholder='用户名'/>
					</Form.Field>
					<Form.Field className='captcha-wrap' name='captcha' error='请输入正确的验证码' empty='请输入验证码' required>
						<Input size='large' placeholder='验证码'/>
						<img src={`/api/user/captcha?_${this.state.timestamp}`} onClick={this._onRefreshCaptcha}/>
					</Form.Field>
					<Form.Field name='password' empty='请输入密码' required>
						<Input size='large'placeholder='密码' type='password'/>
					</Form.Field>
					<Button type='primary' title='立即注册' style={{ width: '100%', height: '40px', lineHeight: '40px'}}/>
				</Form>
			</PageCommonPassport>
		)
	}
}