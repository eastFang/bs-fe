import React from 'react'
import { Input, Button, Space, PageCommon } from 'aliasComponent'
import fly from 'flyio'

export default class extends React.Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}

	_onSubmit(evt) {
		evt.preventDefault()
		const { username, password } = this.refs
		fly.post(`/api/user/login?name=${username.state.value}&password=${password.state.value}`).then((res) => {
			if (res.status === 200) {
				if (confirm('登陆成功，前往首页吗？')) {
					this.props.history.push('/')
				}
			}
		})
	}

	render() {
		return (
			<PageCommon.Passport passportBoxTitle='账号登录'>
				<form onSubmit={this._onSubmit}>
					<Space height={24}/>
					<Input name='username' ref='username' placeholder='用户名' size='large'/>
					<Space height={24}/>
					<Input name='password' ref='password' placeholder='密码' size='large' type='password'/>
					<Space height={24}/>
					<Button type='primary' title='登录' style={{ width: '100%', height: '40px', lineHeight: '40px'}}/>
				</form>
			</PageCommon.Passport>
		)
	}
}