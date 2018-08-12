import React from 'react'
import { Input, Button, Space, PageCommon, Message } from 'aliasComponent'
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

	_onSubmit(evt) {
		evt.preventDefault()
		const { name: { state: { value: name }  }, captcha: { state: { value: captcha }  }, password: { state: { value: password }} } = this.refs
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
		debugger
		this.setState({
			timestamp: Date.now()
		})
	}

	render() {
		return (
			<PageCommon.Passport passportBoxTitle='账号注册'>
				<form onSubmit={this._onSubmit}>
					<Space height={24}/>
					<Input size='large' placeholder='用户名' ref='name'/>
					<Space height={24} />
					<div className='captcha-wrap'>
						<Input size='large' placeholder='验证码' ref='captcha'/>
						<img src={`/api/user/captcha?_${this.state.timestamp}`} onClick={this._onRefreshCaptcha}/>
					</div>
					<Space height={24} />
					<Input size='large'placeholder='密码' ref='password' type='password'/>
					<Space height={24} />
					<Button type='primary' title='立即注册' style={{ width: '100%', height: '48px', lineHeight: '48px'}}/>
				</form>
			</PageCommon.Passport>
		)
	}
}